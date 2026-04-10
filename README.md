# ToDo List

A personal **To-Do List** project built with **HTML**, **CSS**, and **JavaScript** to practice and improve my JavaScript skills.

This project was created as a way to go beyond small exercises and build something more interactive and practical. Instead of making only a single task list, I decided to create an application where users can first create multiple lists and then manage the tasks inside each one. This helped me practice working with application state, DOM manipulation, local storage, and dynamic rendering.

## Overview

The application has two main parts:

- A home page where users can create, rename, open, and delete task lists
- A list page where users can manage the tasks inside a selected list

All data is stored in the browser using **localStorage**, which means the lists and tasks remain saved even after refreshing the page or closing the browser.

The interface was designed to feel modern and visually appealing, using a glassmorphism-inspired style, a background image, progress tracking, and small visual feedback features like confetti when all tasks are completed.

## Features

- Create multiple to-do lists
- Open a specific list and manage its tasks
- Rename existing lists
- Delete lists
- Add new tasks
- Mark tasks as completed
- Edit incomplete tasks
- Delete tasks
- Track completed tasks with a progress bar
- Display the number of completed tasks out of the total
- Show motivational messages based on progress
- Trigger confetti when all tasks are completed
- Save all lists and tasks in `localStorage`

## How It Works

On the home page, the user can create different lists by entering a list name. Each list is saved in `localStorage` as part of a larger object containing all lists. From there, the user can:

- Click a list name to open it
- Edit the list name
- Delete the list

When a list is opened, the app reads the list name from the URL parameters and loads the corresponding tasks from `localStorage`.

Each task includes:
- The task text
- Its completion status

The application updates the UI dynamically whenever a task is added, edited, completed, or removed. It also recalculates progress and updates the motivational message in real time.

## Progress Tracking

A progress section appears at the top of each task list page. It includes:

- A progress bar
- A completion counter
- A motivational message

The motivational message changes depending on how many tasks are complete:

- `Keep it Up!` when progress is still low
- `Almost Done!` when at least half of the tasks are completed
- `Great Job!` when all tasks are complete

When the user completes all tasks in a list, a confetti effect is triggered to celebrate the result.

## Design

The project uses a soft glassmorphism-style interface with:

- A blurred transparent card layout
- A full-screen background image
- Rounded inputs and buttons
- Color-coded edit and delete actions
- Responsive adjustments for smaller screens

I wanted the project to feel more polished than a basic practice app, so I focused not only on functionality but also on making the interface visually pleasant and interactive.

## Technologies Used

- HTML
- CSS
- JavaScript
- localStorage
- Font Awesome
- tsParticles Confetti

## Project Structure

- `home.html` - Home page for creating and managing task lists
- `list.html` - Page for viewing and managing tasks inside a selected list
- `script.js` - Main JavaScript logic for list creation, task management, progress updates, and localStorage persistence
- `style.css` - Styling for both pages
- `assets/` - Stores project assets such as the background image

## What I Practiced

This project helped me improve my understanding of:

- DOM manipulation
- Event listeners
- Dynamic rendering
- Working with URL parameters
- Storing and retrieving structured data with `localStorage`
- Updating UI state based on data changes
- Building multi-page frontend logic
- Creating a more polished and interactive user experience

## How to Run

1. Clone the repository
2. Open `home.html` in your browser

No dependencies or build tools are required, since this is a frontend-only project.

## Final Thoughts

I built this project as a personal way to test and improve my JavaScript abilities by creating something practical and more complete than a simple exercise. It allowed me to work with real interactions such as persistent storage, multiple pages, dynamic updates, and progress-based feedback.

This project was especially useful for strengthening my confidence with JavaScript and understanding how different parts of a small application connect together to create a full user experience.
