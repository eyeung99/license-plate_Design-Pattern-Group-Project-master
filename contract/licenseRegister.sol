pragma solidity ^0.4.2;

contract LicenseRegister {

    uint[] public plates;

    struct License {
        string name;
        
        string _address;
        
        address ETHAddress;
        
        string VIN;

        uint plateNumber;
    }
    
    mapping(string => License) licenseByVIN;
    
    mapping(uint => License) licenseByPlateNumber;

    mapping(address => License) licenseByETHAddress;

    function register(string name, string _address, string VIN, uint plateNumber) public {
        require(plates[plateNumber] == 0, 'plateNumber already taken');
        licenseByVIN[VIN] = License(name, _address, msg.sender, VIN, plateNumber);
        licenseByPlateNumber[plateNumber] = License(name, _address, msg.sender, VIN, plateNumber);
        licenseByETHAddress[msg.sender] = License(name, _address, msg.sender, VIN, plateNumber);
        // measurementsByPatient[patient] = Measurement(temperature, now);
    } 

    

    function getLicenserByVIN(string VIN) public view returns (string, string, address, string, uint) {
        return (licenseByVIN[VIN].name, licenseByVIN[VIN]._address, licenseByVIN[VIN].ETHAddress, licenseByVIN[VIN].VIN, licenseByVIN[VIN].plateNumber);
    }

    

    function getLicenseByPlateNumber(uint plateNumber) public view returns (string, string, address, string, uint) {
        return (licenseByPlateNumber[plateNumber].name, licenseByPlateNumber[plateNumber]._address, licenseByPlateNumber[plateNumber].ETHAddress, licenseByPlateNumber[plateNumber].VIN, licenseByPlateNumber[plateNumber].plateNumber);
    }
    
    function getLicenserByETHAddress(address ETHAddress) public view returns (string, string, address, string, uint) {
        return (licenseByETHAddress[ETHAddress].name, licenseByETHAddress[ETHAddress]._address, licenseByETHAddress[ETHAddress].ETHAddress, licenseByETHAddress[ETHAddress].VIN, licenseByETHAddress[ETHAddress].plateNumber);
    }

}