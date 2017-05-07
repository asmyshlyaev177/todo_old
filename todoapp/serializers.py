from rest_framework import serializers
from todoapp.models import TodoList, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'created', 'complete', 'completed',
                 'order', 'todo')
        
        
class TodoSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True)
    class Meta:
        model = TodoList
        fields = ('id', 'title', 'task', 'complete', 'completed', 'created')
        
