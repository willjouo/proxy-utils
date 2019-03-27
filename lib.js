const Proxy = {
    isSet: (data)=>{
        if(typeof data === 'string')
            return data.length > 0;
        if(typeof data === 'object' && data !== null && data.address && typeof data.address === 'string' && data.address !== null && data.address.trim().length > 0)
            return true;
        return false;
    },

    dataToString: (data)=>{
        data = Object.assign({}, {
            login: '',
            password: '',
            address: '',
            port: ''
        }, data);

        let p = data.login.length > 0 ? data.login : '';
        if(p.length > 0 && data.password.length > 0) p += ':'+data.password;
        if(p.length > 0) p += '@';
        p += data.address;
        if(data.port.length > 0) p += ':'+data.port;

        return p.length > 0 ? 'http://'+p : '';
    },

    stringToData: (string)=>{
        if(string.length === 0) return;
        if(string.startsWith('http://')) string = string.substring(7);

        let res = {
            address: string,
            port: '',
            login: '',
            password: ''
        };

        let authpos = res.address.indexOf('@');
        if(authpos > -1){
            res.login = res.address.substring(0, authpos);
            res.address = res.address.substring(authpos+1);
        }

        let passwordpos = res.login.indexOf(':');
        if(res.login.length > 0 && passwordpos > -1){
            res.password = res.login.substring(passwordpos+1);
            res.login = res.login.substring(0, passwordpos);
        }

        let portpos = res.address.indexOf(':');
        if(portpos > -1){
            res.port = res.address.substring(portpos+1);
            res.address = res.address.substring(0, portpos);
        }

        return res;
    }
}

module.exports = Proxy;
