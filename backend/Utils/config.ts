class Config{
    public webPort = 8080;
    public webHost = 'localhost';
    public mySQLhost = 'mySQL';
    public mySQLuser = 'user';
    public mySQLpassword = '12345678';
    public mySQLdb = 'vacations';
}

const config = new Config();
export default config;