from django.urls import path
from movieapp.views import user_views as views

urlpatterns = [
    # get
    path('profile/', views.list_user_profile, name="user_profile"),
    path('users/', views.list_all_users_by_admin, name="list_users"),
    path('<int:id>', views.list_user_profile_by_admin, name="admin_user_profile"),

    # post
    path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('new/', views.register_new_user, name="add_new_user"),

    # put
    path('update/', views.update_user_profile, name="update_user_profile"),
    path('admin/update-user/<int:id>', views.update_user_profile_by_admin, name="admin_update_user_profile"),

    # delete
    path('delete/<int:id>', views.delete_user, name="delete_user")
]