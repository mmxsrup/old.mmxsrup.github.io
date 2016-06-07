---
layout: post
title: Red and Black
date: 2016-06-06 00:10:09
tags: ICPC AOJ
description: 十字方向の移動をqueueで実装
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1130)

## 問題
スタートから隣接する`.`を通って移動できる`.`の数を求める問題

## 考え方
`int dx[4] = {1, 0, 0, -1};　int dy[4] = {0, 1, -1, 0};`で十字方向に移動したますをqueueにいれて、queueがからになるまで
繰り返す。またすでに通った場所は、0を代入して何度も数えないようにする。

## ミス
queueの実装に少し、手間取った。このような問題で毎回思うことだか、queueにxとyの位置を入れる場所を逆にしてしまう。

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

char board[21][21];
int w, h;
int x, y;// 現在の位置

void slove(void){
	int cnt = 0;
	queue<pint> q;
	q.push(make_pair(y, x));//現在の位置をqueueに入れる

	while(!q.empty()){
		pint now = q.front(); q.pop();
		rep(i, 4){
			int nowy = now.fi + dy[i];//十字方向の移動
			int nowx = now.se + dx[i];
			if (0 <= nowy && nowy <= h - 1 && 0 <= nowx && nowx <= w - 1){
				if (board[nowy][nowx] == '.'){
					cnt++;
					board[nowy][nowx] = 0;
					q.push(make_pair(nowy, nowx));
				}
			}
		}
	}
	printf("%d\n", cnt + 1);//始めの場所も入れる
	return;
}

void scan(int w, int h){
	rep(i, h){
		rep(j, w){
			cin >> board[i][j];
			if (board[i][j] == '@'){
				y = i; x = j;//スタート時点を記録
			}
		}
		getchar();
	}

	slove();
	return;
}

int main(void){
	rep(i, 1000){
		cin >> w >> h;

		if (w == 0) break;
		scan(w, h);
	}
	return 0;
}
{% endhighlight c++ %}