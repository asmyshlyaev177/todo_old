from django.conf.urls import url, include
from django.contrib import admin
from todoapp import views
from rest_framework.documentation import include_docs_urls

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='API schema')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^docs/', include_docs_urls(title='API schema')),
    url(r'^docs2/', schema_view),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^todolist/', views.TodoListView.as_view(), name = 'todolist'),
    url(r'^todo/(?P<pk>([0-9]+))?', views.TodoRUDView.as_view(), name = 'todo'),
    url(r'^tasklist/', views.TaskListView.as_view(), name='tasklist'),
    url(r'^task/(?P<pk>([0-9]+))?', views.TaskRUDView.as_view(), name='task'),
]
