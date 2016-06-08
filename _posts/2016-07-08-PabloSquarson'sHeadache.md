---
layout: post
title: Pablo Squarson's Headache
date: 2016-06-07 00:11:10
tags: ICPC AOJ
description: 配列の添字を利用すれば、どこにどの数字があるか探索しなくていい
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1165&lang=jp)

## 問題
指定された数字の隣接する辺に、指定された方向から繋げる。

## 考え方
`vpint num(200)`を利用する。添字が箱の数字の番号を示す。`num[i].fi`i番目の数字がついた箱が置かれているx座標。`num[i].se`i番目の数字がついた箱が置かれいるy座標。(0の箱はx=0 y=0)　
こうすることにより、添えで箱の番号を指定できるのでミスに書いたような箱がどこにあるかを探すプログラムが必要なくなる。つまり配列の添字を利用して、xy座標の情報だけを書き換えれば楽に実装できるということ。

## ミス
はじめに思いついた解法は`board[400][400]`を作り`board[200][200] = 0`としてその周りをあたえられたクエリに応じて、数字を代入していき、最終的に値が入っているところの最大と最小を求めればいけるなと思いました。しかし、この解法だと、(int s, t;//s番隣接した周りに、tの命令の方向に置く)で毎回全てを探索して探さなければならないなと思い断念。

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
int dx[4] = {1, 0, 0, -1};
int dy[4] = {0, 1, -1, 0};


void slove(int n){
	vpint num(n);//num[番号]
	num[0].fi = 0; num[0].se = 0;//fi　x座標 sey座標
	reps(i, 1, n){//奥数字の番号がi
		int s, t;//s番隣接した周りに、tの命令の方向に置く
		scanf("%d %d", &s, &t);
		if (t == 0){//左に動く
			num[i].fi = num[s].fi - 1;
			num[i].se = num[s].se;
		}else if(t == 1){//下に動く
			num[i].fi = num[s].fi;
			num[i].se = num[s].se - 1;
		}else if(t == 2){//右に動く
			num[i].fi = num[s].fi + 1;
			num[i].se = num[s].se;
		}else if(t == 3){//上に動く
			num[i].fi = num[s].fi;
			num[i].se = num[s].se + 1;
		}
	}
	int mx_x = 0, mi_x = 0, mx_y = 0, mi_y = 0;
	reps(i, 1, n){
		mx_x = max(num[i].fi, mx_x);//xの方の最大値を探す
		mi_x = min(num[i].fi, mi_x);//xの方の最小値を探す
		mx_y = max(num[i].se, mx_y);//y
		mi_y = min(num[i].se, mi_y);//y
	}

	printf("%d %d\n", mx_x - mi_x + 1, mx_y - mi_y + 1);//答え出力
	return;
}

int main(void){
	int n;
	rep(i, 1000){
		cin >> n;
		if (n == 0) break;
		slove(n);
	}
	return 0;
}
{% endhighlight c++ %}