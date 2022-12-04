const parseArgs = () => {
    const allArgs = process.argv //  [0] - nodePath, [1] - appPath, [3..] - arguments
    const args = allArgs.slice(2); // only arguments
    const onlyArgs = args.filter(item => item.slice(0,2) === '--');
    const onlyVals = args.filter(item => item.slice(0,2) !== '--');

    const resultArr = [];
    onlyArgs.forEach((item, index) => resultArr.push(item.slice(2) + ' is ' + onlyVals[index]))
    console.log(resultArr.join(', '));
};

parseArgs();
