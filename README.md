### Info ###
##### name: Ziming Qin #####
##### student#: 101278511 #####
##### name: Shermeen Kazi #####
##### student#: 101270927 #####
##### name: Estella Yeung #####
##### student#: 100316780 #####

# Architecture
## Goal
#### To build a web application on which users can look up ownership of license plate, as well as generate & register themselves new plate through Ethereum blockchain.
## Data
### User Interface Data
##### Username(FirstName, LastName) string
##### UserAddresses string
##### VIN number string
##### Plate number 7-digit integer
### Smart Contract Data
##### Address OwnerAddress
##### String Username
##### String UserAddress
##### String VIN number
##### Uint256 Plate number
##### Mapping OwnerAddress => list of Plates
##### Mapping Username => OwnerAddress
##### Mapping OwnerAddress => Username
##### Mapping Plate => OwnerAddress
## Functions
### User Interface functions
##### searchInfoByETHAddress(eth address)returns object
##### searchInfoByVIN(VIN)returns object
##### searchInfoByPlate(plate)returns object
##### registerNewPlate(username, userAddress, VIN, plate#) returns bool
##### verifyOwnership(plate#) returns string
##### generateRandomPlateNumber() returns list of int
### Smart Contract functions
##### getInfoByAddress(address address) returns array
##### getInfoByVIN(string VIN) returns array
##### getInfoByPlate(uint256 plate) returns array
##### isOwner(uint256 plate#, address address) returns bool
##### register(uint256 plate#, address address) returns object
## Type of Architecture
### UserInterface
##### Javascript/html/css + nodejs + web3/ethers
### Smart Contract
##### Truffle-suite + openzepplin

#### Project plan
List of tasks
Time per task
Identify dependencies
Identify who works on what 
Identify time required for the task


Task 1 - User interface screen for Search or Register 

If search, system displays a second screen to allow input on
ETH address	
VIN number
Plate number
	
	When user presses the submit button
		System goes to do the following tasks:
			SearchInfoByEthAddr
			SearchInfoByVIN
			SearchInfoByPlate

	System returns a search result screen showing the following:
		ETH Address
		Name
		Address
		VIN number
		Plate number

		User can save the info on the screen
		User to press the go back button for more searches
		User to press the exit button to end the session 

Implementation - Estella 3 days for a total of 15 hours:
The search, register screen

Input search criteria screen
ETH address - SearchInfoByETHAddr
VIN - SearchInfoByVIN
Plate - SearchInfoByPlate

Search result screen
ETH Address
Owner Name
VIN number
Plate number
Home Address

Dependencies:
No technical issues identified
There is time to do the work


Task 2 - User interface screen for Search or Register 

If register, system displays a second screen to show the Register Form
Name
Address	
VIN number
Plate number generate button with a window to show result
Plate number self determination button with a window
Press verify button to show if the plate number is available or not
User has the choice to submit or cancel the session
	
	
	When user presses the submit button
		System goes to do the following tasks:
			Register plate (payable)
			If successful, return with a screen showing 1 ETH 
			User has the choice OK or Cancel		
	
	If cancel, revert, and display a message on screen


	If OK
	System returns a register result screen showing the following:
		ETH Address
		Name
		Address
		VIN number
		Plate number

		User can save the info on the screen
		User to press the go back button for more searches
		User to press the exit button to end the session 

Implemention - Shermeen, 3 days for a total of 15 hours

The registration screen
Owner Name
Home Address
VIN number
Plate number, here there is a window for user to enter a unique 8 digit number or request system to generate a plate number.  Either way, need to check uniqueness
Register Plate has a payable function

A user confirmation screen after selection is made and checked 
1 ETH fee payment is made
User to determine OK to proceed or cancel
If user clicks the OK button, system returns with the Registration Result screen
If user clicks the Cancel button, system reverts everything, goes back to the main search, register screen

A registration result screen
ETH Address
Owner Name
VIN number
Plate number
Home Address

Dependencies:
No technical issues identified
There is time to do the work


Task 3 - Design and Implement Smart Contracts 

Implemention - Richard, 3 days for a total of 15 hours


Register
GetInfoByVIN
GetInfoByName
GetInfoByPlate
isOwner(Name)=>plate
isTaken(Plate)?
Connect User Interface and Smart Contract using web3 or ether
Test whole project (Richard, Shermeen, and Estella)

Dependencies:
Task 1 and 2 are completed, tested, no issues identified
No technical issues identified
There is time to do the work
