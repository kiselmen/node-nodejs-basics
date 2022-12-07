const parseEnv = () => {
    const result = Object.keys(process.env).filter(item => item.slice(0,3) === 'RSS').map(item => item + '=' + process.env[item]).join('; ');
    console.log(result);
};

parseEnv();
