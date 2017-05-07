from rest_framework import serializers
from todoapp.models import TodoList, Task



class TaskSerializer(serializers.ModelSerializer):
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
    task = TaskSerializer(many=True, required=False)
    class Meta:
        model = TodoList
        fields = ('id', 'title', 'task', 'complete', 'completed', 'created')
        
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
        
