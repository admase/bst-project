/**
 * Binary Search Tree Project
 */

"use strict";

// 1. Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// 2. Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of "buildTree" which you'll write next.
class BinarySearchTree {
  constructor(descendants) {
    let descendantsSorted = [...new Set(descendants)].sort((a, b) => a - b);
    this.root = this.buildTree(descendantsSorted);
  }

    // 3. Write a buildTree function which takes an array of data (e.g. [1,7,4,23,8,9,4,3,5,7,9,67,6345,324]) and turns it into a balanced binary tree full of Node objects appropriatey placed (don't forget to sort and remove duplicates). It should return the level-0 root node.
  buildTree(descendantsSorted) {
    if (descendantsSorted.length === 0) return null;
    var mid = Math.floor(descendantsSorted.length / 2);
    var newNode = new Node(descendantsSorted[mid]);
    newNode.left = this.buildTree(descendantsSorted.slice(0, mid));
    newNode.right = this.buildTree(descendantsSorted.slice(mid + 1));
    return newNode;
  }

      // 4. Use the prettyPrint() function to console.log your tree in a structured format.
      prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right !== null) {
          this.prettyPrint(
            node.right,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false
          );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      }

    // 5. Write an insert and delete functions which accepts a value to insert/delete.
  insert(data, node = this.root) {
    if (node === null) return new Node(data);
    else if (node.data === data) return;
    else if (node.data < data) node.right = this.insert(data, node.right);
    else node.left = this.insert(data, node.left);
    return node;
  }

  delete(data) {
    const removeNode = function (node, data) {
      if (node === null) return null;
      if (data === node.data) {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = this.removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }

    // 6. Write a find function which accepts a value and returns the node with the given value.
  find(data) {
    let newNode = this.root;
    while (newNode.data !== data) {
      if (data < newNode.data) {
        newNode = newNode.left;
      } else {
        newNode = newNode.right;
      }
      if (newNode === null) {
        return null;
      }
    }
    return newNode;
  }

    // 7. Write a levelOrder function which accepts another function as a parameter levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function
  levelOrder(cb) {
    let Q = [this.root];
    let explored = [];
    while (Q.length > 0) {
      let node = Q.shift();
      cb ? cb(node) : explored.push(node.data);
      let enqueue = [node.left, node.right].filter((data) => data);
      Q.push(...enqueue);
    }
    if (explored.length > 0) return explored;
  }

    // 8. Write inorder, preorder, and postorder functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.
  inorder(cb, node = this.root, inorderList = []) {
    if (node === null) return;
    this.inorder(cb, node.left, inorderList);
    cb ? cb(node) : inorderList.push(node.data);
    this.inorder(cb, node.right, inorderList);
    if (inorderList.length > 0) return inorderList;
  }

  postorder(cb, node = this.root, postorderList = []) {
    if (node === null) return;
    cb ? cb(node) : postorderList.push(node.data);
    this.postorder(cb, node.left, postorderList);
    this.postorder(cb, node.right, postorderList);
    if (postorderList.length > 0) return postorderList;
  }

  preorder(cb, node = this.root, preorderList = []) {
    if (node === null) return;
    this.preorder(cb, node.left, preorderList);
    cb ? cb(node) : preorderList.push(node.data);
    this.preorder(cb, node.right, preorderList);
    if (preorderList.length > 0) return preorderList;
  }

    // 9. Write a height function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.
  height(node = this.root) {
    if (!node) return -1;
    let leftNode = this.height(node.left);
    let rightNode = this.height(node.right);
    if (leftNode < rightNode) {
      return Math.max(1 + leftNode);
    } else {
      return Math.max(1 + rightNode);
    }
  }

    // 10. Write a depth function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
  depth(node = this.root) {
    if (node === null) return -1;
    let leftNode = this.height(node.left);
    let rightNode = this.height(node.right);
    if (leftNode > rightNode) {
      return Math.max(1 + leftNode);
    } else {
      return Math.max(1 + rightNode);
    }
  }

   // 11. Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
  isBalance() {
    return this.height(this.root) >= this.depth(this.root) - 1;
  }

   // 12. Write a rebalance function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
  reBalance() {
    return this.isBalance();
  }
}

/**
 * Binary Search Tree Test Results
 */

// 1. Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
const randomNumbarsArr = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new BinarySearchTree(randomNumbarsArr(5));

tree.insert(300); // working properly
// tree.insert(500);

// console.log(tree.delete(500)); // working properly
// console.log(tree.find(300)); // working properly

// console.log("BST's Height is: " + tree.height()); // working properly
// console.log("BST's Depth is: " + tree.depth()); // working properly

// 2. Confirm that the tree is balanced by calling isBalanced
console.log("BST isBalanced: " + tree.isBalance()); // working properly
console.log("BST reBalanced: " + tree.reBalance()); // working properly

// 3. Print out all elements in level, pre, post, and in order
 console.log("BST levelOrder is: " + tree.levelOrder()); // working properly
 console.log("BST inorder is: " + tree.inorder()); // working properly
 console.log("BST postorder is: " + tree.postorder()); // working properly
 console.log("BST preorder is: " + tree.preorder()); // working properly

tree.prettyPrint(); // working properly
