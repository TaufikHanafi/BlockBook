const AdminContractInfo = {
    contractAddress: '0x86A2EE8FAf9A840F7a2c64CA3d51209F9A02081D',
    contractABI: [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "AdminAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_password",
            "type": "string"
          }
        ],
        "name": "addAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_password",
            "type": "string"
          }
        ],
        "name": "checkAdmin",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    }

const PubliserContractInfo = { 
    contractAddress : '0xA4899D35897033b927acFCf422bc745916139776',
    contractABI : [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "PubliserAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_Identitas",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_bankId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_accessKey",
            "type": "string"
          }
        ],
        "name": "addPubliser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "bookContract",
        "outputs": [
          {
            "internalType": "contract BookContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "bookTransactionContract",
        "outputs": [
          {
            "internalType": "contract BookTransactionContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_identitas",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_bankId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_accessKey",
            "type": "string"
          }
        ],
        "name": "editPubliser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllPublisers",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "Identitas",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "bankId",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "accesHash",
                "type": "bytes32"
              }
            ],
            "internalType": "struct PubliserContract.Publiser[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getPubliser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "Identitas",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "bankId",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "accesHash",
                "type": "bytes32"
              }
            ],
            "internalType": "struct PubliserContract.Publiser",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getPubliserTransactions",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bookContractAddress",
            "type": "address"
          }
        ],
        "name": "setBookContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bookTransactionContractAddress",
            "type": "address"
          }
        ],
        "name": "setBookTransactionContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    }

const UserContractInfo = {
    contractAddress: "0xf953b3A269d80e3eB0F2947630Da976B896A8C5b",
    contractABI: [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "UserAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_accessKey",
            "type": "string"
          }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_accessKey",
            "type": "string"
          }
        ],
        "name": "editUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllUsers",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "bytes32",
                "name": "acceshHash",
                "type": "bytes32"
              }
            ],
            "internalType": "struct UserContract.User[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getUser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "bytes32",
                "name": "acceshHash",
                "type": "bytes32"
              }
            ],
            "internalType": "struct UserContract.User",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getUserTransactions",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bookContractAddress",
            "type": "address"
          }
        ],
        "name": "setBookContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bookTransactionContractAddress",
            "type": "address"
          }
        ],
        "name": "setBookTransactionContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    }
  

const BookContractInfo = {
    contractAddress : '0xAA292E8611aDF267e563f334Ee42320aC96D0463',
    contractABI : [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_publiserContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_adminContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_userContractAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "BookAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_isbn",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_author",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_publiserId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_pdfChecksum",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_harga",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_gambarBuku",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_ebook",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_bahasa",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_jmlHalaman",
            "type": "uint256"
          }
        ],
        "name": "addBook",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_password",
            "type": "string"
          }
        ],
        "name": "deleteBook",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllBooks",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "isbn",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "author",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "pdfChecksum",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "harga",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ebook",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "bahasa",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "jumlahHalaman",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "waktuPublish",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "visible",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "deleted",
                "type": "bool"
              }
            ],
            "internalType": "struct BookContract.Book[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_publiserId",
            "type": "uint256"
          }
        ],
        "name": "getAllBooksByPublisher",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "isbn",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "author",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "pdfChecksum",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "harga",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ebook",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "bahasa",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "jumlahHalaman",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "waktuPublish",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "visible",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "deleted",
                "type": "bool"
              }
            ],
            "internalType": "struct BookContract.Book[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllBooksWithRelation",
        "outputs": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "isbn",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "author",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "publiserId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "pdfChecksum",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "harga",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "gambarBuku",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "ebook",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "bahasa",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "jumlahHalaman",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "waktuPublish",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "visible",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "deleted",
                    "type": "bool"
                  }
                ],
                "internalType": "struct BookContract.Book",
                "name": "book",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "Identitas",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "bankId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "accesHash",
                    "type": "bytes32"
                  }
                ],
                "internalType": "struct PubliserContract.Publiser",
                "name": "publiser",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "publiserId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "gambarBuku",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "total",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "paymentMethod",
                    "type": "string"
                  }
                ],
                "internalType": "struct BookTransactionContract.Transaction[]",
                "name": "transaction",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct BookContract.BookWithRelations[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllNonVisibleBooks",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "isbn",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "author",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "pdfChecksum",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "harga",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ebook",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "bahasa",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "jumlahHalaman",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "waktuPublish",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "visible",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "deleted",
                "type": "bool"
              }
            ],
            "internalType": "struct BookContract.Book[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllVisibleBooks",
        "outputs": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "isbn",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "author",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "publiserId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "pdfChecksum",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "harga",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "gambarBuku",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "ebook",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "bahasa",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "jumlahHalaman",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "waktuPublish",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "visible",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "deleted",
                    "type": "bool"
                  }
                ],
                "internalType": "struct BookContract.Book",
                "name": "book",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "Identitas",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "bankId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "accesHash",
                    "type": "bytes32"
                  }
                ],
                "internalType": "struct PubliserContract.Publiser",
                "name": "publiser",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "publiserId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "bookId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "gambarBuku",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "total",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "paymentMethod",
                    "type": "string"
                  }
                ],
                "internalType": "struct BookTransactionContract.Transaction[]",
                "name": "transaction",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct BookContract.BookVisible[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getBookByIndex",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "isbn",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "author",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "pdfChecksum",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "harga",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ebook",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "bahasa",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "jumlahHalaman",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "waktuPublish",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "visible",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "deleted",
                "type": "bool"
              }
            ],
            "internalType": "struct BookContract.Book",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getBookChecksum",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getBookPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getBookPublisher",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "Identitas",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "bankId",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "accesHash",
                "type": "bytes32"
              }
            ],
            "internalType": "struct PubliserContract.Publiser",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bookTransactionAddress",
            "type": "address"
          }
        ],
        "name": "setBookTransactionContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_visible",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "_password",
            "type": "string"
          }
        ],
        "name": "setVisible",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    }

const BookTransactionContractInfo = {
    contractAddress : '0x5c74c94173F05dA1720953407cbb920F3DF9f887',
    contractABI: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_publiserContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_userContractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_bookContractAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "TransactionAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_userId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_publiserId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_bookId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_gambarBuku",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_title",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_total",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_paymentMethod",
            "type": "string"
          }
        ],
        "name": "addTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "bookContract",
        "outputs": [
          {
            "internalType": "contract BookContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllTransactions",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_transactionId",
            "type": "uint256"
          }
        ],
        "name": "getTransaction",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_adminId",
            "type": "uint256"
          }
        ],
        "name": "getTransactionByAdmin",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_bookId",
            "type": "uint256"
          }
        ],
        "name": "getTransactionByBook",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getTransactionByIndex",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_publiserId",
            "type": "uint256"
          }
        ],
        "name": "getTransactionsByPubliser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_userId",
            "type": "uint256"
          }
        ],
        "name": "getTransactionsByUser",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "publiserId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "bookId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "gambarBuku",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "paymentMethod",
                "type": "string"
              }
            ],
            "internalType": "struct BookTransactionContract.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "publiserContract",
        "outputs": [
          {
            "internalType": "contract PubliserContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_transactionId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_total",
            "type": "uint256"
          }
        ],
        "name": "setTotal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "publiserId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "bookId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "gambarBuku",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "total",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "paymentMethod",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "userContract",
        "outputs": [
          {
            "internalType": "contract UserContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    }


module.exports = {
    AdminContractInfo,
    PubliserContractInfo,
    UserContractInfo, 
    BookContractInfo,
    BookTransactionContractInfo, 
}