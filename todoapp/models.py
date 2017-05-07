from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=140)
    complete = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    completed = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        abstract = True
        
    def __str__(self):
        return "{} - {}".format(self.title, self.created)

    
class TodoList(Todo):
    pass
    
    
class Task(Todo):
    order = models.PositiveSmallIntegerField(blank=True, null=True)
    todo = models.ForeignKey('TodoList', related_name='task')