---
layout: post
title: 列車編成パートⅡ
date: 2016-06-08 00:13:10
tags: ICPC AOJ
description: 同じものが重複しないsetが便利 substrも重要
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1142)

## 問題
文字列を並び変える問題。与えられた文字列をどこかで２つに分けて、その２つの文字列を向きはそのままで再度連結したもの、向きを変えて連結したものなど、合計8通りの方法で再連結する。求めるものは、再連結されてできた文字列の種類の数である。

## 考え方
文字列を２つに分けた文字列を生成しておいて、それを８通りの方法で再連結させて、出来上がった文字列を`set<string> S`に入れていく。
`set`は集合の管理に便利なものであり、要素が値によって整理されており、挿入された要素は集合の中にただ1つ存在し、要素の重複がない。

## ミス
setを思いつけなかった。便利。

## コード

{% highlight c++ %}
#include <iostream>
#include <string>
#include <algorithm>
#include <functional>
#include <queue>
#include <set>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cmath>
using namespace std;
typedef long long ll;
typedef pair<int,int> pint;
typedef vector<int> vint;
typedef vector<pint> vpint;
#define mp make_pair
#define fi first
#define se second
#define all(v) (v).begin(),(v).end()
#define rep(i,n) for(int i=0;i<(n);i++)
#define reps(i,f,n) for(int i=(f);i<(n);i++)
 
void slove(void){
    set<string> S;
    string s;
    cin >> s;
    int size = s.size();
    reps(i, 1, size){//文字列をどの位置できるか
        string s1, s2, revs1, revs2;
        rep(j, i) s1 += s[j];//前半部分
        reps(j, i, size) s2 += s[j];//後半部分
        for (int j = i - 1; j >= 0 ; --j) revs1 += s[j];//前半逆ver
        for (int j = size - 1; j >= i ; --j) revs2 += s[j];//後半逆ver
        //cout << i << s1 << endl << s2 << endl << revs1 << endl << revs2 << endl;
        //８個の組み合わせがある
        S.insert(s1 + s2);
        S.insert(s2 + s1);
        S.insert(s1 + revs2);
        S.insert(revs2 + s1);
        S.insert(revs1 + s2);
        S.insert(s2 + revs1);
        S.insert(revs1 + revs2);
        S.insert(revs2 + revs1);
    }
    cout << S.size() << endl;
    return;
}
 
int main(void){
    int n;
    cin >> n;
    rep(i, n) slove();
 
    return 0;
}
{% endhighlight c++ %}

また`substr`を利用すると、以下のようなコードになる。`s.substr(0, i)`で文字列`s`の0番目の要素からiの長さだけ文字列を取得できる。また、文字列を反転させたものも、反転させた文字列を作っておくことで、`substr`で実装できた。
{% highlight c++ %}
void slove(void){
	set<string> S;
	string s, revs;
	cin >> s;
	int size = s.size();
	for (int i = size - 1; i >= 0; --i) revs += s[i];//文字列を反転させた文字列を生成しておく

	reps(i, 1, size){//文字列をどの位置できるか
		string s1, s2, revs1, revs2;
		s1 = s.substr(0, i);//前半部分
		s2 = s.substr(i);//後半部分
		revs2 = revs.substr(0, size - i);//後半逆ver
		revs1 = revs.substr(size - i);//前半逆ver
		//cout << i << s1 << endl << s2 << endl << revs1 << endl << revs2 << endl;
		//８個の組み合わせがある
		S.insert(s1 + s2);
		S.insert(s2 + s1);
		S.insert(s1 + revs2);
		S.insert(revs2 + s1);
		S.insert(revs1 + s2);
		S.insert(s2 + revs1);
		S.insert(revs1 + revs2);
		S.insert(revs2 + revs1);
	}
	cout << S.size() << endl;
	return;
}
{% endhighlight c++ %}