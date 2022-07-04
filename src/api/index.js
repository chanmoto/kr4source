import CrossValid from '../data/cross.json';


//elementデータを取得する

const DIR = process.env.PUBLIC_URL + "/";
 
export const fetchCrossvalidData = (state) => {

    let dep = Object.values(CrossValid);
    let vals = [];
    let finalReturn = [];
    if (state) {
        for (var i = 0; i < dep.length; i++) {
            var datum = dep[i];
            vals.push(datum);
        }
        let returnInfo = Object.values(vals);
        for (var j = 0; j < returnInfo.length; j++) {
            if (returnInfo[j].State_Letters === state) {
                finalReturn.push(returnInfo[j]);
            }
        }
        return finalReturn;
    }
    try {

        const nodes = [];
        const edges = [];
        
        const services = new Set();//中身が一意になるように、オブジェクトをSetとする
        const persons = new Set();
        const events = new Set();

        //要素にノードを登録する
        dep.forEach(i => {
            persons.add(i.person + ':' + i.sex);
        });
        
        dep.forEach(i => {
            events.add(i.event);
        });

        persons.forEach(i => {
            let img = (i.indexOf(":m") !== -1) ? "man.png":"woman.png" 
            let iid = (i.indexOf(":m") !== -1) ? i.replace(':m', '') : i.replace(':f','')
             
            let el = { 
                id: iid,  
                label: iid, 
                title: i,
                image: DIR + img,
                shape: "image"
            };
            nodes.push(el);
        });

        events.forEach(i => {
            let el = { 
                id: i, 
                label: i, 
                title: i,
                image: DIR + "mountain.png",
                shape: "image"
            };
            nodes.push(el);
        });

        //要素にリンクを登録する
        dep.forEach(ele => {
            let el = {
                    from: ele.person,
                    to: ele.event,
                
            };
            edges.push(el);

        });
        return {nodes:nodes,edges:edges};

    } catch (error) {
    }
}


