---
layout: post
title: Keitai Message AOJ-2006
date: 2016-06-11 08:10:10
tags: ICPC AOJ
description: 周期的なものにはmodを利用するといい感じにできる
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=2006)

## 問題
ガラケーのキーボートのキーlogがもらえるので実際に打った文字列を再現する

## 考え方
`make_pair`を使うとうまくデータを管理できた。また、同じボタンを何度も押していると表示される文字は循環するので、modを利用するといいかも

## ミス
変数jと書かなければならないところをiとしていた。
`tmp[j] == '0'`の部分を`tmp[j] == 0`にしていてバグってた。

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

int main(void){
	pair<int, string> deta[10];//int mod string 文字列
	deta[1] = mp(5, ".,!? ");
	deta[2] = mp(3, "abc");
	deta[3] = mp(3, "def");
	deta[4] = mp(3, "ghi");
	deta[5] = mp(3, "jkl");
	deta[6] = mp(3, "mno");
	deta[7] = mp(4, "pqrs");
	deta[8] = mp(3, "tuv");
	deta[9] = mp(4, "wxyz");
	//deta[0] = mp(0, "");

	int n; cin >> n;
	int tmp;
	rep(i, n){
		string tmp;
		cin >> tmp;
		int size = tmp.size();
		int cnt = 0;
		rep(j, size){
			if(tmp[j] == '0') continue;//0の時はそうさをしない
	
			if(tmp[j] == tmp[j + 1]){
				cnt++;
				continue;
			}
			else{
				int num = tmp[j] - '0';
				string moziretu = deta[num].se;
				printf("%c", moziretu[cnt % deta[num].fi]);//modを使ってうまく計算
				cnt = 0;
			}
		}
		printf("\n");
	}
	return 0;
}
{% endhighlight c++ %}