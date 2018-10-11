var register = {
    helpers: {
        shortAddress: function(address) {
            if (address.length > 36) {
                address = address.substring(0, 34) + ' ...';
            }
            return address;
        },
        shortDescription: function(desc) {
            if (desc.length > 110) {
                desc = desc.substring(0, 109) + ' ...';
            }
            return desc;
        },
        shortTechnology: function(str) {
            if (str.length > 100) {
                str = str.substring(0, 99) + ' ...';
            }
            return str;
        },
        arrayToString: function(array) {
            var str = '';
            array.forEach(element => {
                str += element + ', ';
            });
            return str;
        }
    }
};

module.exports = register.helpers; 