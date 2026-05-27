# Cellphone Tower Network Analyzer

Cellphone Tower Network Analyzer is an interactive React application that simulates a network of cellphone towers. The project demonstrates how data structures and algorithms can be used in a visual application for connectivity checking, tower search, routing cost analysis, and load balancing.

## Project Idea

The application represents a cellphone tower system as a graph:

- towers are nodes
- connections are edges
- each connection has a cost
- each tower has current users and maximum capacity

The user can interact with the network through buttons and see the result directly on the graph.

## Data Structures and Algorithms Used

### Disjoint Set

Disjoint Set is used to check if the tower network is fully connected.

The application creates a set for each tower, then uses union operations for all active connections. After that, it checks if all towers belong to the same connected component.

Used in:

- Check Connectivity
- testing the network after disabling connections

### B-Tree

The B-Tree is used to index towers by ID.

Each tower is inserted into the B-Tree using its ID. The application can display the towers in sorted order using traversal, or search for a specific tower by ID.

Used in:

- Traverse / Search B-Tree
- displaying sorted tower IDs
- searching tower information by ID

### MinHeap

The MinHeap is used when the smallest priority value is needed.

Used in:

- finding the least loaded tower
- finding the cheapest connection

For the least loaded tower, the priority is the number of active users.  
For the cheapest connection, the priority is the connection cost.

### MaxHeap

The MaxHeap is used when the highest priority value is needed.

Used in:

- finding the best available tower
- automatic user rebalancing

For these operations, the priority is the available capacity of each tower.

## Features

- interactive tower network visualization
- highlighted towers and connections
- connectivity checking
- tower search by ID using B-Tree
- sorted tower display using B-Tree traversal
- least loaded tower detection using MinHeap
- cheapest connection detection using MinHeap
- normal and dynamic connection cost modes
- random traffic simulation
- best available tower detection using MaxHeap
- automatic user rebalancing
- disabling and resetting network connections

## Technologies Used

- React
- JavaScript
- HTML
- CSS

## How to Run the Project

Install dependencies:
npm install
npm run dev
