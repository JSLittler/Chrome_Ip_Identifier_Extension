window.alert('oeirhgoiehrgoih');
console.log('here');

const ipArray = []
const isIp = (myString) => {
    const r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/
    let ip;
    myString.match(r) ? ip = myString.match(r)[0] : ip = '';
    if (ip) {
        return ip;
    }
};
const getBodyArray = () => {
    const body = document.body.textContent;
    const array = body.split(" ");
    array.filter(Boolean);
    return array.filter(s => s.length > 6);
};
const textArray = getBodyArray();
const fillIpArray = (string) => {
    const ip = isIp(string);
    ip && ipArray.push(ip);
}
textArray.map(s => fillIpArray(s));
console.log([...new Set(ipArray)]);

