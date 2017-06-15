from rest_framework import serializers
from todoapp.models import TodoList, Task
from django.utils.six import BytesIO
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer


class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Task
        fields = ('id', 'title', 'created', 'complete', 'completed',
                 'order', 'todo')
        extra_kwargs = {
            'title': {
                'help_text': 'Title for task'
            },
            'created': {
                'help_text': 'Auto-generated date of creation'
            },
            'complete': {
                'help_text': 'Boolean completed or not, default - False'
            },
            'completed': {
                'help_text': 'Date when Task was completed, format 2017-05-06T12:30:28.239680Z'
            },
            'order': {
                'help_text': "Optional Task's order in list"
            },
            'todo': {
                'help_text': 'Id for related Todo'
            }
        }
        
class TodoSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True, required=False, read_only=False)
    class Meta:
        model = TodoList
        fields = ('id', 'title', 'task', 'complete', 'completed', 'created')
        
    def update(self, instance, validated_data):
        tasks = validated_data.pop('task')
        for el in tasks:
            upd_task = Task.objects.get(id=el.get('id', None))
            upd_task.order = el.get('order', None)
            #print(el.get('id', None), ' ', el.get('order', None))
            upd_task.save()
        return instance
    
        extra_kwargs = {
            'title': {
                'help_text': 'Title for Todo'
            },
            'task': {
                'help_text': 'Related Tasks'
            },
            'complete': {
                'help_text': 'Boolean completed or not, default - False'
            },
            'completed': {
                'help_text': 'Date when Todo was completed, format 2017-05-06T12:30:28.239680Z'
            },
            'created': {
                'help_text': "Auto-generated date of creation"
            }
        }
        
