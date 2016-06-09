---
layout: post
title: 月曜土曜素因数
date: 2016-06-08 10:10:10
tags: ICPC AOJ
description: 少し複雑な条件に従って判定する問題
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1154)

## 問題
問題文は分かりにくい。定義通りにやる問題

## 考え方
まず約数であるかを全探索で`slove関数`で判断し、さらにそれが素数であるかを`check関数`で判断して回答をさがす。初めに書いた答えは、`check関数`で全探索をしないで済むように、それまでに見つけた約数であり素数でもある数を`vector<int> v`に入れておき、それを約数にあるかどうかで判断することで、素数判定を行った。結果的にはこ解放でACが出たが、素数かどうかを判定する数字が、今までに出てきた約数かつ素数である数字を約数に持つかどうかで判定するだけでいいのか、よくわからない部分がある。
２つ目の解放は、素数判定の部分`check関数`を全探索でやっているので、上記のようなことは考えなくてもいい。
icpcは制限時間がどうなってるのかよくわからない。

## ミス
main関数内のfor文のループ回数を1000にしてたため、WAになり原因がわからなかった。条件をしっかり確認したい。

## コード

{% highlight c++ %}
#include <iostream>
#include <string>
#include <algorithm>
#include <functional>
#include <vector>
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

int cnt;
vector<int> v;//約数であり素数でもある数を入れていく


//答えを出力
void print(int num){
	printf("%d:", num);
	for (int i = 0; i < v.size(); ++i){
		printf(" %d", v[i]);
	}
	printf("\n");
	return;
}


//その約数が素数かどうかを確かめる
void check(int yakusu){
	for (int i = 6; i < yakusu; i += 7){
		if (yakusu % i == 0) return;
	}
	for (int i = 8; i < yakusu; i += 7){
		if (yakusu % i == 0) return;
	}

	v.push_back(yakusu);//素数であったので入れる
	return;
}

void slove(int num){
	//約数であるかを探し、それが素数であるかをcheck()関数で素数かどうかを判定へ
	for (int i = 6; i<= num; i += 7){
		if (num % i == 0) check(i);
		if (num % (i + 2) == 0) check(i + 2);
	}
	return;
}

int main(void){
	int n;
	rep(i, 10000000){
		scanf("%d", &n);
		if(n == 1) break;
		slove(n);
		print(n);
		v.clear();//vがグローバル変数に入っているので、これで削除しないと変な挙動に
	}	

	return 0;
}
{% endhighlight c++ %}

素数判定を全探索で
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

int cnt;
vector<int> v;//約数であり素数でもある数を昇順に入れていく

void print(int num){
	printf("%d:", num);
	rep(i, cnt) printf(" %d", v[i]);
	printf("\n");
	return;
}

//その約数が素数かどうかを確かめる
void check(int yakusu){
	if (cnt == 0){
		v.push_back(yakusu);//cnt==0でくる約数はかならず素数でもある
		cnt++;
	}else{
		rep(i, cnt){
			if (yakusu % v[i] == 0) break;//v[i]に入っている素数で割り切れたので、素数ではない			

			//すでにv[i]に入っているもの全てで割り切れなかったので、素数である
			if (i == cnt - 1){
				cnt++;
				v.push_back(yakusu);
			}
		}
	}
	
	return;
}

void slove(int num){
	cnt = 0;//cntの初期化
	//約数であるかを探し、それが素数であるかをcheck()関数で判定へ
	for (int i = 6; i<= num; i += 7){
		if (num % i == 0) check(i);
		if (num % (i + 2) == 0) check(i + 2);
	}
	return;
}

int main(void){
	int n;
	rep(i, 1000000){
		scanf("%d", &n);
		if(n == 1) break;
		slove(n);
		print(n);
		v.clear();//vがグローバル変数に入っているので、これで削除しないと変な挙動に
	}	

	return 0;
}
{% endhighlight c++ %}