from rest_framework import generics
from todoapp.serializers import TodoSerializer, TaskSerializer
from todoapp.models import TodoList, Task
from rest_framework import mixins


class TodoListView(generics.ListCreateAPIView):
    """
    View for display list and create Todo
    get:
    Return a list of all Todo
    post:
    Create a new Todo
    """
    
    serializer_class = TodoSerializer
    queryset = TodoList.objects.all()
    
    
class TodoRUDView(generics.RetrieveUpdateDestroyAPIView):
    """
    View for retrieve, update or delete Todo
    get:
    Return a list of all Todo
    put:
    Update a Todo
    patch:
    Partial update a Todo
    delete:
    Delete a Todo
    """
    serializer_class = TodoSerializer
    queryset = TodoList.objects.all()

class TaskListView(generics.ListCreateAPIView):
    """
    View for list of Task or create a new one
    get:
    Return a list of all Tasks
    post:
    Create a new Task
    """
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
class TaskRUDView(generics.RetrieveUpdateDestroyAPIView):
    """
    View for retrieve, update or delete Task
    get:
    Return a list of all Tasks
    put:
    Update a Task
    patch:
    Partial update a Task
    delete:
    Delete a Task
    """
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
