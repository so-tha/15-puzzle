## 15-puzzle 

Este projeto implementa um **solucionador de quebra-cabeça de 15 peças** utilizando o algoritmo **A\*** e Dijkstra. O algoritmo encontra o menor número de movimentos necessários para resolver o quebra-cabeça, partindo de uma configuração inicial até atingir o estado final desejado. 

### Principais Características:
- **Algoritmo A\***: Usa a **heurística de Manhattan** para guiar a busca de forma eficiente e reduzir o espaço de busca.
- **Min-Heap**: A implementação utiliza um min-heap para melhorar o desempenho ao selecionar o próximo nó a ser expandido.
- **Estados Repetidos**: Os estados já visitados são armazenados em um conjunto para evitar explorações redundantes.

### Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/so-tha/15-puzzle.git
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd 15-puzzle
   ```
3. Execute o script (certifique-se de ter o Node.js instalado):
   ```bash
   node index.js
   ```

### Exemplo de Uso

O estado inicial do quebra-cabeça está configurado no arquivo `index.js`. O algoritmo irá calcular e exibir o número de movimentos necessários e o caminho da solução.

### Requisitos

- **Node.js**: Necessita de ter o Node.js instalado para executar o código.

### Estrutura do Código

- `aStarSolver`: Implementa o algoritmo A* com otimizações.
- `manhattanDistance`: Calcula a distância de Manhattan entre o estado atual e o estado final.
- `MinHeap`: Estrutura de dados usada para melhorar a eficiência da seleção de nós.
