'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDiveided = document.getElementById('tweet-area');
/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

};


assessmentButton.onclick = () => {
    const userName =userNameInput.value
    if(userName.length === 0) {
        return;
    }

    removeAllChildren(resultDivided);
    removeAllChildren(tweetDiveided);
    

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    const anchor = document.createElement('a');
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDiveided.appendChild(anchor);
    const scrpt = document.createElement('script');
    scrpt.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDiveided.appendChild(scrpt);

    

};
userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
};
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果が返ってくる関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //userName(文字列)を数値に変換
    var userNameNumber = 0;
    for (let i = 0; i < userName.length; i++){
        userNameNumber += userName.charCodeAt(i);
    };
    
    // 数値にしたものをanswersの配列数で割って余りを求める (0~15の数値にする)
    var answerNumber = userNameNumber % answers.length;
    // answersNumberをanswersの添え字にしてresultに代入する
    var result = answers[answerNumber];
    return result.replace(/\{userName\}/g, userName);
    
}

console.assert(
    assessment('太郎') === assessment('太郎'),
        '同じ名前が入力されているのに同じ診断結果が出力されていません。'
);

