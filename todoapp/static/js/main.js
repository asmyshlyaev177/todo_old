'use strict';
var todo;

$(window).on('load', (function(){
    RegisterPartial();
    CompileTemplate();
    TodoButtons();
    GetTodoList();
    TaskEdit();
    TodoEdit();
    TaskDelete();
    TodoDelete();
    TaskClick();
    SaveAndSubmit();
}))



function RegisterPartial() {
    //шаблон для тасков
    Handlebars.registerPartial('task',
    '<div class="task-group">'+
        '<div class="task" todo={{todo}} taskid={{id}}'+
        '{{#if complete }}complete {{/if}}>{{title}}</div>'+
        '<div class="buttons pull-right">'+
                '<span class="task-edit btn-default btn-xs glyphicon glyphicon-pencil" todo={{todo}} elem={{id}}></span>'+
                '<span class="task-rm btn-default btn-xs glyphicon glyphicon-remove" todo={{todo}} elem={{id}}></span>'+
                '<span class="task-ok btn-default btn-xs glyphicon glyphicon-ok" todo={{todo}} elem={{id}} style="display: none;"></span>'+
        '</div>'+
    
    '</div>');
}

function DataSort(arr, field, reverse=false) {
	if (reverse == true) {
		arr.sort(function(a, b) {
		return parseInt(b[field]) - parseInt(a[field]);
	})} else {
		arr.sort(function(a, b) {
			return parseInt(a[field]) - parseInt(b[field]);
		});
	}
	return arr;
}

function CompileTemplate(){
    var source = $("#todo-template").html();
    todo = Handlebars.compile(source);
}

function GetTodoList(complete=null) {
    //основная функция получения списка тодо, complete м.б. null, false или true
    var url = '/todolist/';
    if ( complete != null ) {
        url = '/todolist/?complete='+complete;
    }
    $.ajax({
        cache: false,
        dataType: 'json',
        method: 'GET',
        url: url,
        success: function(data) {
            //прячем поле для новых тасков на начальную позицию, а то удалиться или задвоится
            var form = $('.new-elem').hide();
                $('.main-buttons').after(form);
            
            var context = new Array();
            for (var i=0; i < data.length; i++) {
                DataSort(data[i].task, 'order');
            }
            
            context['todo'] = DataSort(data, 'id');
            var html = todo(context);
            $( "#content" ).replaceWith( '<div id="content">' + html + '</div>' );
        }
    });
}
 
function TodoButtons() {
    //эвенты для кнопок
    $(document).on('click', '.navbar-brand', function() {
        GetTodoList();
        return false;
    });
    $(document).on('click', '.all-todo', function() {
        GetTodoList();
    });
    $(document).on('click', '.pending-todo', function() {
        GetTodoList(false);
    });
    $(document).on('click', '.completed-todo', function() {
        GetTodoList(true);
    });
    $(document).on('click', '.add-todo', function() {
        var form = $('.new-elem');
        $(form).attr('type', 'todo'); //отмечаем тип добавляемого элементы
        $('.main-buttons').after(form);
        $(form).show();
        $('#newelem').focus();
    });
    $(document).on('click', '.add-task-btn', function() {
        var todoid = $(this).attr('elem');
        var form = $('.new-elem');
        $(form).attr('type', 'task').attr('elem', $(this).attr('elem'));
        $(this).after(form);
        $('.new-elem').show();
        $('#newelem').focus();
    });
}

function SaveAndSubmit() {
    //кнопка сохранить при добавлении нового тодо или таска
    $(document).on('click', '.save-elem', function() {
        var title = $('#newelem').val();
        var dataToSend;
        var urlStr;
        var type = $('.new-elem').attr('type');
        if ( title.length > 1 ) {
            if ( type == 'todo') {
                urlStr = '/todolist/';
                dataToSend = {"title": title};
            } else if ( type == 'task') {
                urlStr = '/tasklist/';
                var todoid = $('.new-elem').attr('elem');
                dataToSend = {"todo": todoid, "title": title};
            }
            var csrf = getCookie('csrftoken');
            
            $.ajax({
                headers: {'X-CSRFToken': csrf},
                cache: false,
                dataType: 'json',
                method: 'POST',
                url: urlStr,
                data: dataToSend,
                success: function(data) {
                    $('.new-elem').hide();
                    $('#newelem').val('');
                    if (type == 'todo') {
                        var context = new Array();
                        context['todo'] = [data];
                        var html = todo(context); //передаём данные в шаблон
                        $('#content').append(html);
                    } else if (type == 'task') {
                        var context = new Array();
                        context = data;
                        var html = Handlebars.partials['task'](context);
                        $('.save-elem').parents('.list-group').append(html);
                    }
                }
            });
        }
    });
}

function ToggleEditMode(todoid, taskid) {
    //переключатель режима редактирования для названий тасков и тодо
    if ( todoid && taskid ) { //для тасков
       if ($('div.task[todo='+todoid+'][taskid='+taskid+']').attr('contenteditable')) 
           //если уже редактируется выключаем
            {
                $('div.task[todo='+todoid+'][taskid='+taskid+']').removeAttr('contenteditable');
                $('span.task-edit[todo='+todoid+'][elem='+taskid+']').show();
                $('span.task-rm[todo='+todoid+'][elem='+taskid+']').show();
                $('span.task-ok[todo='+todoid+'][elem='+taskid+']').hide();
            } else {
                //иначе ставим контентедитэбл, прячем кнопки удалить и редактировать и показываем кнопку ок
                $('div.task[todo='+todoid+'][taskid='+taskid+']').attr('contenteditable', 'true').focus();
                $('span.task-edit[todo='+todoid+'][elem='+taskid+']').hide();
                $('span.task-rm[todo='+todoid+'][elem='+taskid+']').hide();
                $('span.task-ok[todo='+todoid+'][elem='+taskid+']').show();
            } 
    } else if (todoid && !taskid ) { //для тодо
        if ( $('.todo-header[todoid='+todoid+']').attr('contenteditable') ) {
            $('.todo-edit[elem='+todoid+']').show();
            $('.todo-ok[elem='+todoid+']').hide();
            $('.todo-header[todoid='+todoid+']').removeAttr('contenteditable');
        } else {
            $('.todo-edit[elem='+todoid+']').hide();
            $('.todo-ok[elem='+todoid+']').show();
            $('.todo-header[todoid='+todoid+']').attr('contenteditable', 'true').focus();
        }
    }
    
}

function TaskEdit() {
    $(document).on('click', '.task-edit', function() {
        var elem = $(this);
        var todoid = $(elem).attr('todo');
        var taskid = $(elem).attr('elem');
        ToggleEditMode(todoid, taskid);
    })

    $(document).on('click', '.task-ok', function() {
        var elem = $(this);
        var todoid = $(elem).attr('todo');
        var taskid = $(elem).attr('elem');
        var title = $('div.task[todo='+todoid+'][taskid='+taskid+']').text().trim();
        //обновляем таск
        var csrf = getCookie('csrftoken');
        $.ajax({
            headers: {'X-CSRFToken': csrf},
            cache: false,
            dataType: 'json',
            method: 'PATCH',
            url: '/task/'+taskid,
            data: {"todo": todoid, "title": title},
            success: function(data) {
                ToggleEditMode(todoid, taskid);
                $('div.task[todo='+todoid+'][taskid='+taskid+']').text(data.title);
            }
        });
    }) 
}

function TodoEdit() {
    $(document).on('click', '.todo-edit', function() {
        var todoid = $(this).attr('elem');
        ToggleEditMode(todoid);
        
    })
    $(document).on('click', '.todo-ok', function() {
        var todoid = $(this).attr('elem');
        var title = $('.todo-header[todoid='+todoid+']').text().trim();
        var csrf = getCookie('csrftoken');
        $.ajax({
            headers: {'X-CSRFToken': csrf},
            dataType: 'json',
            method: 'PATCH',
            url: '/todo/'+todoid,
            data: {"title": title},
            success: function(data) {
                ToggleEditMode(todoid);
                $('.todo-header[todoid='+todoid+']').text(data.title);
            }
        });
    })
}

function TaskDelete() {
    $(document).on('click', '.task-rm', function() {
        var elem = $(this);
        var todoid = $(elem).attr('todo');
        var taskid = $(elem).attr('elem');
        var csrf = getCookie('csrftoken');
        $.ajax({
            headers: {'X-CSRFToken': csrf},
            cache: false,
            dataType: 'json',
            method: 'DELETE',
            url: '/task/'+taskid,
            success: function(data) {
                $('div.task[todo='+todoid+'][taskid='+taskid+']').parent().remove();
                CheckTodoComplete(todoid);
            }
        });
    })    
}

function CheckTodoComplete(todoid) {
    //при отметке таска как выполненного проверяем если все таски завершены тодо тоже меняет статус
    var complete;
    var completed;
    var csrf = getCookie('csrftoken');
	if ( $('div.task[todo='+todoid+']').not('[complete]').length == 0 
            && $('div.task[todo='+todoid+']').length>0 ) {
        if ($('.todo-header[todoid='+todoid+']').not('[complete]')) {
            var d = new Date();
            completed = d.toISOString();
            complete = true;
            $.ajax({
                headers: {'X-CSRFToken': csrf},
                cache: false,
                dataType: 'json',
                method: 'PATCH',
                url: '/todo/'+todoid,
                data: {"complete": complete, "completed": completed},
                success: function(data) {
                    if (data.complete == true) {
                        $('.todo-header[todoid='+todoid+']').attr('complete', '');
                    } else {
                        $('.todo-header[todoid='+todoid+']').removeAttr('complete');
                    }
                }
            }); 
        }
		
	} else {
        if ($('.todo-header[todoid='+todoid+']').is('[complete]')) {
            completed = null;
            complete = false;
            $.ajax({
                headers: {'X-CSRFToken': csrf},
                cache: false,
                dataType: 'json',
                method: 'PATCH',
                url: '/todo/'+todoid,
                data: {"complete": complete, "completed": completed},
                success: function(data) {
                    if (data.complete == true) {
                        $('.todo-header[todoid='+todoid+']').attr('complete', '');
                    } else {
                        $('.todo-header[todoid='+todoid+']').removeAttr('complete');
                    };
                }
            });  
        }
    }
}

function TaskClick() {
    //переключаем статус тасков выполнено/невыполнено по клику
    $(document).on('click', 'div.task', function() {
        if ( !$(this).is('[contenteditable]') ) {
            var elem = $(this);
            var todoid = $(elem).attr('todo');
            var taskid = $(elem).attr('taskid');
            var complete;
            var completed;
            if ($(elem).is('[complete]')) {
                complete = false;
                completed = null;
            } else {
                complete = true;
                var d = new Date();
                completed = d.toISOString();
            }
            var csrf = getCookie('csrftoken');
            $.ajax({
                    headers: {'X-CSRFToken': csrf},
                    cache: false,
                    dataType: 'json',
                    method: 'PATCH',
                    url: '/task/'+taskid,
                    data: {"todo": todoid, "complete": complete, "completed": completed},
                    success: function(data) {
                        if (data.complete == true) {
                            $(elem).attr('complete', '');
                        } else {
                            $(elem).removeAttr('complete');
                        };
                        CheckTodoComplete(todoid);
                    }
            }); 
        }
        
    })
}

function TodoDelete() {
    $(document).on('click', '.rm-todo-btn', function() {
        var todoid = $(this).attr('elem');
        var csrf = getCookie('csrftoken');
        $.ajax({
            headers: {'X-CSRFToken': csrf},
            cache: false,
            dataType: 'json',
            method: 'DELETE',
            url: '/todo/'+todoid,
            success: function(data) {
                var form = $('.new-elem').hide();
                $('.main-buttons').after(form);
                $('div.todo[todoid=' + todoid+']').remove();
            } 
        });
    });
}

function getCookie(name) {
    /* получаем куки */
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
