const API_KEY = config.API_KEY;
console.log(API_KEY)

const teach = (filename, expansion, check, index) => {

    // 表示用の要素
    let teach_obj = document.getElementById(`teach${index}`);

    let filenameArray = [];
    teach_obj.textContent = "";

    if (check === "OK") {
        return
    }

    // 半角英数記号の正規表現
    const AlphAndNum = /^[a-zA-Z0-9!-/:-@¥([-`{-~]*$/;

    // 正しいファイル名とその要素
    const c_num = classNum.value
    const s_num = studentNum.value
    const correct_filename = c_num.split("_")[0] + "-" + s_num + "-" + c_num.split("_")[1]

    switch (index) {
        // 拡張子重複
        case 0:
            let dup_expansion = filename.split(/(?=\.[^.]+$)/);
            filenameArray.push(dup_expansion[0]);
            filenameArray.push('<span style="color:red">' + dup_expansion[dup_expansion.length-1] + "</span>");
            break;
        // 文字数過剰・不足
        case 1:
            filenameArray.push(filename.substr(0,20));
            filenameArray.push('<span style="color:red">' + filename.substr(20) + "</span>");
            // console.log(filenameArray)
            break;
        // 空白文字
        case 2:
            for (let i = 0; i < filename.split("").length; i++) {
                const char = filename.split("")[i];
                if (char.match(" ") || char.match("　")) {
                        filenameArray.push('<span style="background-color:red">' + char + "</span>");
                        continue
                } else {
                    filenameArray.push(char);
                }
            }
            break;
        // 半角英数字以外
        case 3:
            for (let i = 0; i < filename.split("").length; i++) {
                const char = filename.split("")[i];
                if (char.match(AlphAndNum)) {
                    filenameArray.push(char);
                } else {
                    //  特定の文字にクラスredをあてる
                    filenameArray.push('<span style="color:red">' + char + "</span>");
                }
            }
            break;
        // 正解と不一致
        case 4:
            for (let i = 0; i < filename.split("").length; i++) {
                const char = filename.split("")[i];
                const correct_char = correct_filename.split("")[i]
                if (char === correct_char) {
                    filenameArray.push(char);
                } else {
                    //  特定の文字にクラスredをあてる
                    filenameArray.push('<span style="color:red">' + char + "</span>");
                }
            }
            break;
        default:
            return
    }

    const result = filenameArray.join("");
    teach_obj.innerHTML = result  + expansion;
    // console.log(result + expansion)
}

const answer = (flag, expansion) => {
    // 正しいファイル名とその要素
    const c_num = classNum.value
    const s_num = studentNum.value
    const correct_filename = c_num.split("_")[0] + "-" + s_num + "-" + c_num.split("_")[1]

    // 正解のファイル名
    let answer_obj = document.getElementById('answer')

    if (flag === 1) {
        answer_obj.textContent = "正しいファイル名：" + correct_filename + expansion
    } else {
        answer_obj.textContent = ""
    }
}

const checkStudentNum = () => {
    // 数字の正規表現
    const Num = /^[0-9]*$/

    // 学籍番号の入力値を取得
    let s_num = studentNum.value

    // 注意書きの各要素
    const e1 = document.getElementById('studentNumAlert1')
    const e2 = document.getElementById('studentNumAlert2')

    // 学籍番号が7桁未満の場合、注意書きを表示
    if (s_num.length < 7) {
        e1.classList.remove('collapse')
        return 0
    } else {
        if (!e1.classList.contains('collapse')) {
            e1.classList.add('collapse')
        }
    }

    // 学籍番号として数字以外が入力されている場合、注意書きを表示
    if (!s_num.match(Num)) {
        e2.classList.remove('collapse')
        return 0
    } else {
        if (!e2.classList.contains('collapse')) {
            e2.classList.add('collapse')
    }
    }

    return 1
}


const check = () => {

    // 半角英数記号の正規表現
    const AlphAndNum = /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/;

    // 正しいファイル名とその要素
    const c_num = classNum.value
    const s_num = studentNum.value
    const correct_filename = c_num.split("_")[0] + "-" + s_num + "-" + c_num.split("_")[1]

    // フォームの値を取得
    let s_arr = fileName.value.split("\\");
    let str = s_arr[s_arr.length-1];

    // ファイル名と拡張子を分離
    let fn_arr = str.split(/(?=\.[^.]+$)/);
    let filename = fn_arr[0]
    let expansion = fn_arr[fn_arr.length-1]


    // フォームに空欄があった場合、何もせずにアラートを表示
    if (filename === "" || c_num === "" || s_num === "") {
        alert("すべての項目を入力してください")
        return
    }

    // 学籍番号の入力を確認
    let flag = checkStudentNum()


    // ファイル名が正しいかをジャッジ
    let checkList = []          // "OK" or "NG"
    let resultTextList = []     // "" or "(問題点)"
    let diffTextLen = Math.abs(filename.length - 20)

    // 拡張子が重複していないかチェック
    let fn_tale = filename.split(/(?=\.[^.]+$)/)
    if (fn_tale[fn_tale.length-1] === expansion) {
        checkList.push("NG")
        resultTextList.push("拡張子が重複しています．")
    } else {
        checkList.push("OK")
        resultTextList.push("")
    }

    // 文字数チェック
    if(filename.length > 20) {
        checkList.push("NG")
        resultTextList.push(`文字数が${diffTextLen}文字多いです．`);
    } else if (filename.length < 20) {
        checkList.push("NG")
        resultTextList.push(`文字数が${diffTextLen}文字少ないです．`);
    } else {
        checkList.push("OK")
        resultTextList.push("")
    }

    // 空白文字チェック
    if (filename.match(" ") || filename.match("　")) {
        checkList.push("NG")
        resultTextList.push("空白文字が含まれています．");
    } else {
        checkList.push("OK")
        resultTextList.push("")
    }

    // 全角文字チェック
    if (!filename.split(" ").join('').split("　").join('').match(AlphAndNum)) {
        checkList.push("NG")
        resultTextList.push("半角英数記号以外が含まれています．");
    } else {
        checkList.push("OK")
        resultTextList.push("")
    }

    // 正しいファイル名と完全に一致するかチェック
    if ((filename).match(correct_filename)) {
        checkList.push("OK")
        resultTextList.push("正しいファイル名と一致します．");
    } else {
        checkList.push("NG")
        resultTextList.push("誤ったファイル名です．");
    }
    console.log(filename)
    console.log(correct_filename)


    for (i=0; i<checkList.length; i++) {
        if (checkList[i] === "NG") {
            document.getElementById(`check${i}`).classList.replace('bg-success', 'bg-danger')
        }
        // } else if (checkList[i] === "OK" && checkList[i] === "") {
        //     document.getElementById(`check${i}`).classList.replace('bg-dark', 'bg-success')
        //     console.log("correct")
        // }
        document.getElementById(`check${i}`).textContent = resultTextList[i]
        // console.log(document.getElementById(`check${i}`))
        teach(filename, expansion, checkList[i], i)
    }


    answer(flag, expansion)
    console.log(checkList)
    console.log(resultTextList)
}