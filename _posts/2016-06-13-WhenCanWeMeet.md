---
layout: post
title: When Can We Meet? AOJ-1124
date: 2016-06-06 00:10:10
tags: ICPC AOJ
description: バケットソート　やるだけ
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1124)

## 問題
社員の人数N、議決に必要な人数Qと社員にとって都合の良い日が与えられる。最も都合の良い社員が多くて、早い日を答えよ。
正し議決に必要な人数に満たない場合には0と出力せよ。

## 考え方
`date[添字]`で添字を利用して、添字と日にちが同じになるように、その配列に予定が合う人数を記録していき、その中でも添字が最小のものを探す。

## ミス
なし

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
	int n, q; //会員数　最低人数

	while(1){
		cin >> n >> q;
		if(n == 0) break;
		int date[100000] = {0};
		rep(i, n){
			int m; cin >> m;
			rep(j, m){
				int tmp;
				cin >> tmp;
				date[tmp]++;
			}
		}

		int max = 0;
		rep(i, 100000){
			if(date[max] < date[i]) max = i;
		}
		if(date[max] >= q) printf("%d\n", max);
		else printf("0\n");
	}
	return 0;
}
{% endhighlight c++ %}