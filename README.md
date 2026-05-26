# Cellphone Tower Routing Analyzer

## Project Description
Cellphone Tower Routing Analyzer is an interactive web application that simulates a network of cellphone towers and the connections between them. The project was created to demonstrate how classic data structures and algorithms can be integrated into a practical and visual application.

The network is represented as a graph:
- towers represent nodes;
- connections between towers represent edges;
- each connection has a cost;
- each tower stores information about current users, maximum capacity, and available capacity.

The user can interact with the network through the interface and test different operations such as connectivity checking, searching towers, traffic simulation, finding optimal towers, and load balancing.

The project is implemented using React and JavaScript, while Vite is used for the development environment.

---

# Data Structures and Algorithms Used

## 1. Disjoint Set
The Disjoint Set data structure is used to verify whether the network is fully connected.

Each tower initially belongs to its own set. When two towers are connected, the union operation merges their sets together. After processing all connections, the application checks if all towers belong to the same root set.

The implementation includes:
- path compression;
- union by rank;
- parent tracking.

This structure is used by the **Check Connectivity** functionality and also helps verify the network after disabling connections.

---

## 2. B-Tree
The B-Tree is used for indexing and searching towers by ID.

Each tower is inserted into the tree using its unique identifier. The structure keeps the data organized and sorted, making searches efficient.

The implementation includes:
- insertion;
- search;
- node splitting;
- traversal.

The B-Tree is used by:
- Build Tower B-Tree Index
- Search Tower in B-Tree

---

## 3. MinHeap
The MinHeap is used when the application needs to quickly retrieve the minimum value.

It is used for:
- finding the least loaded tower;
- finding the cheapest connection.

For tower load analysis, the number of current users is used as the heap priority. For connection analysis, the edge cost becomes the priority.

The application also supports:
- normal connection cost;
- dynamic cost with congestion penalties.

---

## 4. MaxHeap
The MaxHeap is used for operations that require finding the maximum available value quickly.

It is used for:
- finding the best available tower;
- automatic load balancing.

Each tower is inserted using its available capacity as priority. Towers with more free capacity are extracted first.

During auto rebalancing, overloaded towers transfer users toward towers with larger available capacity.

---

# Application Features
The application includes:
- interactive network graph visualization;
- tower load visualization;
- dynamic connection costs;
- connectivity checking;
- tower search by ID;
- disabling and resetting connections;
- random traffic simulation;
- finding the least loaded tower;
- finding the cheapest connection;
- finding the best available tower;
- automatic user rebalancing;
- highlighted towers and edges for algorithm results.

---

# Technologies Used
- React
- JavaScript
- Vite
- HTML
- CSS

---

# How the Application Works
The application stores towers and connections inside separate data structures. The main React component manages:
- towers;
- connections;
- highlighted nodes and edges;
- status messages;
- load balancing operations.

Whenever the user presses a button, the corresponding algorithm is executed and the graph updates automatically.

Examples:
- connectivity uses Disjoint Set;
- tower search uses B-Tree;
- cheapest connection uses MinHeap;
- best available tower uses MaxHeap.

---

# How to Run the Project

npm install
npm run dev
http://localhost:5173 
