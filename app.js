var chiefOfVillageList;
fetch("./data.json")
.then((res) => {
    console.log("連接成功");
    res.json().then((data) => {
        chiefOfVillageList = data;
        chiefOfVillageCount();
        printOut();
    });
})
.catch((e) => {
    console.log("錯誤!", e)
});

const chiefOfVillageData = {
    sexual:{
        male:0,
        female:0
    },
    party:{
        "中國國民黨": 0,
        "民主進步黨": 0,
        "無黨籍": 0,
        "其他政黨": 0
    },
    district:{},
    qianZhenDistCount:0,
    sanminDistFemaleChiefCount:0
}

function chiefOfVillageCount() {
    chiefOfVillageList.forEach((item) => {
        const district = item["區別"];

        if (chiefOfVillageData.district[district]) {
            chiefOfVillageData.district[district]++;
        } else {
            chiefOfVillageData.district[district] = 1;
        }

        if (item["性別"] === "男") {
            chiefOfVillageData["sexual"].male++;
        } else {
            chiefOfVillageData["sexual"].female++;
        }

        if (item["區別"] === "前鎮區") {
            chiefOfVillageData.qianZhenDistCount++;
        } else if (item["區別"] === "三民區" && item["性別"] === "女") {
            chiefOfVillageData.sanminDistFemaleChiefCount++;
        }

        if (item["黨籍"] === "中國國民黨") {
            chiefOfVillageData.party["中國國民黨"]++;
        } else if (item["黨籍"] === "民主進步黨") {
            chiefOfVillageData.party["民主進步黨"]++;
        } else if (item["黨籍"] === "無黨籍") {
            chiefOfVillageData.party["無黨籍"]++;
        } else {
            chiefOfVillageData.party["其他政黨"]++;
        }

    })
}

function printOut() {
    console.log(`一共有${chiefOfVillageData["sexual"]["male"]}位男里長，${chiefOfVillageData["sexual"]["female"]}位女里長，總共有${chiefOfVillageList.length}位里長`);
    console.log(`前鎮區共有${chiefOfVillageData["qianZhenDistCount"]}位里長`);
    console.log(`三民區共有${chiefOfVillageData["sanminDistFemaleChiefCount"]}位女里長`);
    console.log(`無黨籍有${chiefOfVillageData["party"]["無黨籍"]}位、民主進步黨有${chiefOfVillageData["party"]["民主進步黨"]}位、中國國民黨有${chiefOfVillageData["party"]["中國國民黨"]}位`);
    console.log(chiefOfVillageData["district"]);
}