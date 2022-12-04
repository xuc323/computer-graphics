# Computer Graphics

[![stats](https://img.shields.io/website-up-down-green-red/http/computer-graphics.xchen.org)]("https://computer-graphics.xchen.org")
![example branch parameter](https://github.com/xuc323/computer-graphics/actions/workflows/static.yml/badge.svg?branch=main)

## Introduction

This is a repository for my computer graphics course. It contains all the sources code for the projects from this course.

## Project List

### Project 0: Setup the Web Page

This project is the starting point of the following projects. The webpage is setup here and ready to be shipped by the web server.

### Project 1: Drawing a Triangle

This project is to draw a triangle on the screen. The triangle is drawn by the vertex shader and the fragment shader. The vertex shader is used to transform the vertex position from the object space to the clip space. The fragment shader is used to fill the color of the triangle. The viewport is based on the size of the canvas.

### Project 2: Drawing Shapes with Different Drawing Modes

This project is to draw shapes with different drawing modes. The shapes are drawn by the vertex shader and the fragment shader. The vertex shader is used to transform the vertex position from the object space to the clip space. The fragment shader is used to fill the color of the triangle. The viewport is based on the size of the canvas. The drawing modes are `POINTS`, `LINES`, `LINE_STRIP`, `LINE_LOOP`, `TRIANGLES`, `TRIANGLE_STRIP`, `TRIANGLE_FAN`. They all serve the same purpose, but with different ways to draw the shapes, also with different ways to connect the vertices.

### Project 3: Animation and User Input

This project is to draw a sphere with `TRIANGLE_STRIP` mode, and a square with 4 lines with `LINES` mode. The sphere is animated by moving in the x and y directions of the screen, and the speed is randomly generated at each page load. The square acts as the border of the sphere. The user can control the location of the square by pressing the `w`, `a`, `s`, `d` keys. The user can also control the size of the square by using the input fields on the webpage. The square will be drawn with the size specified by the user.

### Project 4: Texture Mapping and Flat Lighting in The Solar System

This project is to draw the solar system with texture mapping and flat lighting, as well as animation to emulate the solar system. Planets that are in the solar system are drawn in the scene. The sun is the center of the solar system, and other planets are orbiting around the sun. Although the sun is the light source in the solar system, here the light source is actually the directional light from infinite far away. Planets are orbiting with varying orbital planes. The screen can be dragged by mouse to change the view of the scene.

### Project 5: Discover Gouraud Shading, Phong Shading, and Specularity

This project is to draw a sphere in the middle of the screen. The sphere is being lit by a directional light from infinite far away. The sphere is drawn with limited number of vertices so the differences of the shading models can be observed. The shading models are `Gouraud Shading`, `Phong Shading`, and their corresponding `Specularity`. The user can control the sphere by dragging the mouse. The user can also control the direction of the directional light, and the colors of both ambient light and directional light. Specularity can also be toggled on and off by interacting with the checkbox on the webpage.

### Project 6: Load 3D Models and Discover Point Light

This project is to load 2 3D models, and draw them apart on the screen. The 3D models not only get lit by the directional light and ambient, they also get lit by the point light. The user can control the position of the point light and the models by dragging. The user can also control the direction of the directional light. Since point lights are not visible to users, two spheres are drawn to represent the point light.

## Built With

![WebGL](https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
