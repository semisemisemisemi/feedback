#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<vector<int>> graph;
vector<bool> visited;
vector<int> distance;
int n; // number of nodes

void bfs(int start) {
    // 여기에 코드를 작성하세요.
}

int main() {
    // n: number of nodes, m: number of edges
    int n, m, u, v, t1, t2;

    cin >> n >> m;
    graph.resize(n);
    visited.resize(n, false);
    distance.resize(n, -1);

    for (int i = 0; i < m; i++) {
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }

    cin >> t1 >> t2; // nodes to find shortest path between

    bfs(t1);

    cout << distance[t2] << endl; 

    return 0;
}
