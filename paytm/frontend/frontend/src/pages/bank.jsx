import React, { useState, useEffect } from 'react';

const Bank = () => {
  const [userData, setUserData] = useState([]);
  const [mergeSortTime, setMergeSortTime] = useState(0);
  const [bubbleSortTime, setBubbleSortTime] = useState(0);
  const [insertionSortTime, setInsertionSortTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/bank/bulk');
        const data = await response.json();

        const mergeStartTime = performance.now();
        const sortedUsersMerge = mergeSort(data.users, data.account);
        const mergeEndTime = performance.now();
        setMergeSortTime(mergeEndTime - mergeStartTime);

        const bubbleStartTime = performance.now();
        const sortedUsersBubble = bubbleSort(data.users, data.account);
        const bubbleEndTime = performance.now();
        setBubbleSortTime(bubbleEndTime - bubbleStartTime);

        const insertionStartTime = performance.now();
        const sortedUsersInsertion = insertionSort(data.users, data.account);
        const insertionEndTime = performance.now();
        setInsertionSortTime(insertionEndTime - insertionStartTime);

        setUserData({
          ...data,
          usersMerge: sortedUsersMerge,
          usersBubble: sortedUsersBubble,
          usersInsertion: sortedUsersInsertion
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const mergeSort = (array, accountData) => {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middle);
    const rightArray = array.slice(middle);

    return merge(
      mergeSort(leftArray, accountData),
      mergeSort(rightArray, accountData),
      accountData
    );
  };

  const merge = (leftArray, rightArray, accountData) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      const leftBalance = accountData.find(acc => acc.userId === leftArray[leftIndex]._id).balance;
      const rightBalance = accountData.find(acc => acc.userId === rightArray[rightIndex]._id).balance;

      if (rightBalance > leftBalance) {
        result.push(rightArray[rightIndex]);
        rightIndex++;
      } else {
        result.push(leftArray[leftIndex]);
        leftIndex++;
      }
    }

    return result.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
  };

  const bubbleSort = (array, accountData) => {
    let n = array.length;
    let sortedArray = [...array];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const leftBalance = accountData.find(acc => acc.userId === sortedArray[j]._id).balance;
        const rightBalance = accountData.find(acc => acc.userId === sortedArray[j + 1]._id).balance;

        if (leftBalance > rightBalance) {
          let temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }
    return sortedArray;
  };

  const insertionSort = (array, accountData) => {
    let n = array.length;
    let sortedArray = [...array];

    for (let i = 1; i < n; i++) {
      let key = sortedArray[i];
      let j = i - 1;
      while (j >= 0 && accountData.find(acc => acc.userId === sortedArray[j]._id).balance > accountData.find(acc => acc.userId === key._id).balance) {
        sortedArray[j + 1] = sortedArray[j];
        j = j - 1;
      }
      sortedArray[j + 1] = key;
    }
    return sortedArray;
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-300">
      <h1 className="text-3xl font-bold mb-4">Bank Admin Page</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Merge Sort</h2>
        <p className="mb-4">Time taken: {mergeSortTime} milliseconds</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.usersMerge && userData.usersMerge.map(user => {
            const balance = userData.account.find(acc => acc.userId === user._id).balance;
            const cardClasses = `border p-6 border-2 rounded-md ${balance < 3000 ? 'border-red-500 bg-rose-200 .animation-pulse ' : 'border-lime-700'}`;

            return (
              <div key={user._id} className={cardClasses}>
                <h3 className="text-lg font-bold mb-2">User: {user.firstName} {user.lastName}</h3>
                <p className="mb-2">Username: {user.username}</p>
                <p>Balance: {balance}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Bubble Sort</h2>
        <p className="mb-4">Time taken: {bubbleSortTime} milliseconds</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.usersBubble && userData.usersBubble.map(user => {
            const balance = userData.account.find(acc => acc.userId === user._id).balance;
            const cardClasses = `border p-6 border-2  rounded-md ${balance < 3000 ? 'border-red-500 bg-rose-200 animation-pulse' : 'border-lime-700'}`;

            return (
              <div key={user._id} className={cardClasses}>
                <h3 className="text-lg font-bold mb-2">User: {user.firstName} {user.lastName}</h3>
                <p className="mb-2">Username: {user.username}</p>
                <p>Balance: {balance}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Insertion Sort</h2>
        <p className="mb-4">Time taken: {insertionSortTime} milliseconds</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.usersInsertion && userData.usersInsertion.map(user => {
            const balance = userData.account.find(acc => acc.userId === user._id).balance;
            const cardClasses = `border p-6 border-2  rounded-md ${balance < 3000 ? 'border-red-500 bg-rose-200 animation-pulse' : 'border-lime-700'}`;

            return (
              <div key={user._id} className={cardClasses}>
                <h3 className="text-lg font-bold mb-2">User: {user.firstName} {user.lastName}</h3>
                <p className="mb-2">Username: {user.username}</p>
                <p>Balance: {balance}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bank;
