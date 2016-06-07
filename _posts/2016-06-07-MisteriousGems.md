---
layout: post
title: Misterious Gems
date: 2016-06-06 00:10:07
tags: ICPC AOJ
description: xy平面上を動かす問題
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=2000)

## 問題
xy座標に宝石が置かれている点と、xy座標をどのように動くのかをあわらす値が与えられる。xy座標を動く命令を全て行ったあとに、全ての宝石が取れたかどうかを比べる問題。

## 考え方
まずxy座標をしめす`field[y][x]`に宝石がある位置は1を代入する。そして、そのあと命令に従って動かし、`field[y][x] == 1`の場所を通れば、その点から-1する。（宝石は同じ地点にかならず１つしかないと言われているので0を代入してもいいかな）最後に全ての格子点にある数字を足していく。その合計`sum`が0であれば、全ての宝石が取られたことを示している。

## ミス
すんなりとかけた。

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
#define REP(i,n) for (int i=(n)-1;i>=0;i--)
#define reps(i,f,n) for(int i=(f);i<(n);i++)
#define REPS(i,f,n) for (int i=(f)-1;i>=(n);i--)
int dx[4] = {1, 0, 0, -1};
int dy[4] = {0, 1, -1, 0};

int n;
int field[21][21];

void hantei(void){

	int sum = 0;
	rep(i, 21) rep(j, 21) sum += field[i][j];

	if (sum == 0) printf("Yes\n");
	else printf("No\n");
	return;
}


void slove(int n){
	int x = 10, y = 10; //現在の位置を示す変数
	rep(i, 21) rep(j, 21) field[i][j] = 0;
	rep(i, n){
		int pointx, pointy;
		cin >> pointx >> pointy;
		field[pointy][pointx] = 1;//宝石があることを示すために
	}

	int meireikaisu;
	cin >> meireikaisu;
	rep(i, meireikaisu){
		string meirei;
		int kyori;
		cin >> meirei >> kyori;
		if (meirei[0] == 'N'){
			reps(j, 1, kyori + 1){
				if (field[y + j][x] == 1) field[y + j][x]--;//とったら引く
			}
			y += kyori;
		}else if(meirei[0] == 'E'){
			reps(j, 1, kyori + 1){
				if (field[y][x + j] == 1) field[y][x + j]--;
			}
			x += kyori;
		}else if(meirei[0] == 'S'){
			reps(j, 1, kyori + 1){
				if (field[y - j][x] == 1) field[y - j][x]--;
			}
			y -= kyori;
		}else if(meirei[0] == 'W'){
			reps(j, 1, kyori + 1){
				if (field[y][x - j] == 1) field[y][x - j]--;
			}
			x -= kyori;
		}
	}
	hantei();
}

int main(void){
	rep(i, 1000){
		cin >> n;
		if (n == 0) break;
		slove(n);
	}
	return 0;
}
{% endhighlight c++ %}