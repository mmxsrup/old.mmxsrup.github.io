---
layout: post
title: 島はいくつある?
date: 2016-06-07 00:10:10
tags: ICPC　AOJ
description: 斜めも含む動き queueで実装する必要ないか？
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1160)

## 問題
隣り合う８方向(斜めも含む)は陸続きであり、陸続きの部分は島とする。島がいくつあるか求める問題。

## 考え方
`int dx[8] = {1, 0, 0, -1, 1, 1, -1, -1};　int dy[8] = {0, 1, -1, 0, 1, -1, 1, -1};`を使えば簡単に８方向に動きを実装できる。隣あった部分に動き、陸であればそれを塗りつぶしつつ、(`board[nowy][nowx] = 0;`)繋がっている部分をカウントしていく。最終的にすべてが海になるまでやればいい。

## ミス
`cnt`をグローバル変数に入れていて一度ミスった。実装は類題をやったばかりなので簡単だった。
わざわざqueueに入れる必要ないか。

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
int dx[8] = {1, 0, 0, -1, 1, 1, -1, -1};
int dy[8] = {0, 1, -1, 0, 1, -1, 1, -1};

int board[51][51];
int w, h;

void slove(void){
	int cnt = 0;
	queue<pint> q;
	rep(i, h){
		rep(j, w){
			if (board[i][j] == 1){
				q.push(mp(i, j));
				cnt++;

				while(!q.empty()){
					pint now = q.front(); q.pop();
					rep(i, 8){
						int nowy = now.fi + dy[i];
						int nowx = now.se + dx[i];
						if (0 <= nowy && nowy <= h - 1 && 0 <= nowx && nowx <= w - 1 && board[nowy][nowx] == 1){
							board[nowy][nowx] = 0;
							q.push(make_pair(nowy, nowx));
						}
					}
				}
			}
		}
	}

	printf("%d\n", cnt);
	return;
}

void scan(int w, int h){
	rep(i, h) rep(j, w) cin >> board[i][j];

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