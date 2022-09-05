import dayjs from 'dayjs'
import axios from "axios";

/**
 * 驼峰转下划线
 * @param {*} str
 * @returns
 */
export const toLowerLine = (str) => {
    var temp = str.replace(/[A-Z]/g, function (match) {
        return "_" + match.toLowerCase();
    });
    if (temp.slice(0, 1) === '_') { //如果首字母是大写，执行replace时会多一个_，这里需要去掉
        temp = temp.slice(1);
    }
    return temp;
};


/**
 * 获取随机颜色
 * @returns
 */
export const getColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
}

/**
 * 得到最近开奖号码
 */
export const getTwoColoBallData = () => {
    const appId = "sqnmugmnspqditkh";
    const appSecret = "akw0SkhCOVoweWhWT3FQQ3dJNHgxUT09";
    const code = "ssq";
    axios.get('https://www.mxnzp.com/api/lottery/common/latest',
        {
            params: {
                code: code,
                app_id: appId,
                app_secret: appSecret
            }
        })
        .then(function (res) {
            return res;
        })
        .catch(function (error) {
            console.log(error)
        })
}

/**
 * 得到随机号码
 */
export const getNewDateTwoColoBallData = () => {
    for(var i=1,red=[];i<34;i++){

        red.push(i);

    }

    for(var i=1,blue=[];i<17;i++){

        blue.push(i);

    }

    for(var i=0,temp=[];i<6;i++){

        var index=Math.floor(Math.random()*red.length);

        temp.push(red[index]);

        red.splice(index,1);

    }

    temp.sort(function (a,b){

        return a-b;

    })

    var index1=Math.floor(Math.random()*blue.length)+1;

    temp.push(index1);

    var strNum = "";
    for(var i=0;i<temp.length;i++){
        if (i === temp.length-1){
            strNum += temp[i];
        }else if (i === temp.length-2){
            strNum += temp[i] + "+";
        }else{
            strNum += temp[i] + ",";
        }
    }
    return strNum;
}


/**
 * 生成一个从min 到 max 的随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 对生日时间倒计时进行排序
 * @param {*} list
 * @returns
 */
export const sortBirthdayTime = (list) => {
    list.forEach(item => {
        const diffDay = Math.ceil(dayjs(dayjs().format('YYYY') + '-' + item.date).diff(dayjs(), 'day', true))
        if (diffDay >= 0) {
            item['diffDay'] = diffDay
        } else {
            item['diffDay'] = Math.ceil(dayjs(dayjs().add(1, 'year').format('YYYY') + '-' + item.date).diff(dayjs(), 'day', true))
        }
    })
    return list.sort((a, b) =>
        a.diffDay > b.diffDay ? 1 : -1
    );
};
