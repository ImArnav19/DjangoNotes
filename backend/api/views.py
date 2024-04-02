from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Note

class CreateUserView(generics.CreateAPIView):       #create view for showing users
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class NoteListCreateView(generics.ListCreateAPIView):     #basic abstraction where from Generics we are getting all the web procesing requests
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):                                     #nothing but the Get Request
        user =  self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):                    #nothing but the post request 
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDeleteView(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
        
