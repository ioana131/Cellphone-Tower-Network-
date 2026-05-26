Cellphone Tower Routing Analyzer - Documentation
1. Project Description
Cellphone Tower Routing Analyzer is a web application that simulates a network of cellphone towers and the connections between them. The application allows the user to visualize towers, check if the network is connected, find the least loaded tower, find the cheapest connection, search towers by ID, simulate traffic, and rebalance users between towers.
The project uses React for the interface and JavaScript for implementing the data structures and algorithms.
The network is represented as a graph:
•	towers are nodes; 
•	connections between towers are edges; 
•	each edge has a cost; 
•	each tower has a current number of users and a maximum capacity. 
The user can interact with the network using buttons from the interface. The result of each algorithm is shown in the status area, and important towers or connections are highlighted on the graph.
2. Data Structures and Algorithms Used
2.1 Disjoint Set
The Disjoint Set data structure is used to check if all towers in the network are connected.
Each tower starts as its own separate set. Then, for every connection between two towers, the algorithm applies the union operation. If two towers are connected, they become part of the same set.
After all connections are processed, the application checks if all towers have the same root. If they do, the network is fully connected. If not, the network is not fully connected.
The implementation uses:
•	parent to store the representative/root of each tower; 
•	rank to keep the tree balanced; 
•	path compression in find; 
•	union by rank in union. 
In the application, Disjoint Set is used by the Check Connectivity button and also helps test the network after disabling a connection.
2.2 B-Tree
The B-Tree is used to build an index of the towers and search towers by ID.
Each tower object is inserted into the B-Tree using its ID. The tree keeps the towers sorted, which makes searching organized and efficient.
The B-Tree implementation includes:
•	search, used to find a tower by ID; 
•	insert, used to add a tower into the tree; 
•	splitChild, used when a node becomes full; 
•	traverse, used to display towers in sorted order. 
In the application, B-Tree is used by:
•	Build Tower B-Tree Index 
•	Search Tower in B-Tree 
This helps demonstrate how indexing can be used in a network application.
2.3 MinHeap
The MinHeap is used when the application needs to find the smallest value quickly.
It is used in two cases:
•	to find the least loaded tower; 
•	to find the cheapest connection. 
For the least loaded tower, the tower ID is inserted as the value, and the number of current users is inserted as the priority. The tower with the smallest number of users becomes the root and is extracted first.
For the cheapest connection, each connection is inserted into the heap with its cost as priority. The connection with the smallest cost is extracted and highlighted.
The application also supports two cost modes:
•	normal cost; 
•	dynamic cost, which includes congestion penalties based on tower load. 
2.4 MaxHeap
The MaxHeap is used when the application needs to find the largest value quickly.
It is used for load balancing:
•	Find Best Available Tower 
•	Auto Rebalance Users 
For finding the best available tower, each tower is inserted into the MaxHeap with its available capacity as priority. The tower with the most free spots is extracted first.
For auto rebalancing, overloaded towers are detected, and users are moved to towers with more available capacity. MaxHeap is useful because it always gives the tower with the highest available capacity first.
3. Application Features
The application includes the following features:
•	visual graph of cellphone towers and connections; 
•	zoomable SVG network panel; 
•	tower load visualization; 
•	edge cost labels with normal and dynamic cost; 
•	checking if the graph is connected; 
•	disabling and resetting connections; 
•	finding the least loaded tower using MinHeap; 
•	finding the cheapest connection using MinHeap; 
•	building and searching a B-Tree tower index; 
•	simulating random traffic; 
•	finding the best available tower using MaxHeap; 
•	automatically rebalancing users between overloaded towers. 
4. How the Application Works
The towers and connections are stored in a separate data file. Each tower contains:
•	ID; 
•	name; 
•	x and y position; 
•	maximum capacity; 
•	current users; 
•	available capacity. 
The main logic is placed in the React App component. The application keeps the towers, connections, messages, highlighted towers, highlighted edges, and load balancing messages in state.
When the user presses a button, the corresponding algorithm is executed. After that, the interface updates the displayed message and highlights the result on the graph.
For example:
•	when the user checks connectivity, Disjoint Set groups connected towers; 
•	when the user searches a tower, B-Tree is used; 
•	when the user finds the least loaded tower, MinHeap is used; 
•	when the user finds the best available tower, MaxHeap is used. 
5. How to Run the Program
To run the project:
1.	Open the project folder in Visual Studio Code. 
2.	Open the terminal. 
3.	Install the dependencies: 
npm install
4.	Start the development server: 
npm run dev
5.	Open the local link shown in the terminal, usually: 
http://localhost:5173
6. Conclusion
This project demonstrates how data structures and algorithms can be used inside an interactive application. The network of cellphone towers is represented visually, and the user can test different operations directly from the interface.
The most important data structures used are Disjoint Set, B-Tree, MinHeap, and MaxHeap. Each one has a clear role in the application:
•	Disjoint Set checks connectivity; 
•	B-Tree indexes and searches towers; 
•	MinHeap finds minimum values; 
•	MaxHeap finds maximum available capacity and supports load balancing. 

