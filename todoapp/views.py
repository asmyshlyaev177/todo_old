from rest_framework import generics
from todoapp.serializers import TodoSerializer, TaskSerializer
from todoapp.models import TodoList, Task
from rest_framework import mixins

class TodoListView(generics.ListCreateAPIView):
    """View for display list and create Todo"""
    serializer_class = TodoSerializer
    queryset = TodoList.objects.all()
    
class TodoRUDView(generics.RetrieveUpdateDestroyAPIView):
    """View for retrieve, update or delete Todo"""
    serializer_class = TodoSerializer
    queryset = TodoList.objects.all()

class TaskListView(generics.ListCreateAPIView):
    """View for list of Task or create a new one"""
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
class TaskRUDView(generics.RetrieveUpdateDestroyAPIView):
    """View for retrieve, update or delete Task"""
    serializer_class = TaskSerializer
    queryset = Task.objects.all()