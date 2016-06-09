---
layout: post
title: Numeral System
date: 2016-06-08 02:17:10
tags: ICPC AOJ
description: 文字列操作
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1137)

## 問題
文字と数字からなる数字が定義される。定義通りに足し算を行いその結果を出力する。

## 考え方
ただ解くだけ()。値の繰上げなどに注意が必要。またstring型に含まれる数字をint型として扱うときに、stringからintに型変更する関数を用いなくても,アスキーコード表を用いて`s[i] - '0'`などで実装可。

## ミス
`array[]`に値を保持しておく必要がなかった。文字列を前から見ていき、その都度計算すればいい話。ここら辺で色々バグらして、デバッグに訳がわからないほどの時間が取られた。死にたい。

## コード

{% highlight c++ %}
#include <iostream>
#include <string>
#include <algorithm>
#include <functional>
#include <vector>
#include <stack>
#include <queue>
#include <set>
#include <bitset>
#include <map>
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

//答えを出力する
void ans(int *array){
	for(int i = 3; i >= 0; --i){
		int kai = array[i] / 10;
		int amari = array[i] % 10;
		array[i] = amari;
		array[i - 1] += kai;
	}

	string ans;
	if (array[0] != 0 && array[0] != 1) ans += to_string(array[0]) + 'm';
	else if (array[0] == 1) ans += 'm';
	if (array[1] != 0 && array[1] != 1) ans += to_string(array[1]) + 'c';
	else if (array[1] == 1) ans += 'c';
	if (array[2] != 0 && array[2] != 1) ans += to_string(array[2]) + 'x';
	else if (array[2] == 1) ans += 'x';
	if (array[3] != 0 && array[3] != 1) ans += to_string(array[3]) + 'i';
	else if (array[3] == 1) ans += 'i';

	cout << ans << endl;
	return;
}

//それぞれの文字の数をarrayに入れていく関数
void slove(string s, int *array){
	int size = s.size();

	rep(i, size){
		if ('0' <= s[i] && s[i] <= '9'){
			if (s[i + 1] == 'm') array[0] += s[i] - '0';
			else if(s[i + 1] == 'c') array[1] += s[i] - '0';
			else if(s[i + 1] == 'x') array[2] += s[i] - '0';
			else if(s[i + 1] == 'i') array[3] += s[i] - '0';
			i++;
		}else{
			if (s[i] == 'm') array[0]++;
			else if(s[i] == 'c') array[1]++;
			else if(s[i] == 'x') array[2]++;
			else if(s[i] == 'i') array[3]++;
		}
	}
}

int main(void){
	int array[5];
	int n; cin >> n;
	rep(i, n){
		string s1, s2;
		cin >> s1 >> s2;
		slove(s1, array);
		slove(s2, array);
		ans(array);
		rep(j, 5) array[j] = 0;
	}

	return 0;
}
{% endhighlight c++ %}