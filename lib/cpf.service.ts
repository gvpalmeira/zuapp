interface ReceitaFederalResponse {
    ni: string;
    nome: string;
    nascimento: string;
    situacao: {
      codigo: string;
      descricao: string;
    };
    nomeMae: string;
  }
  
  const API_TOKEN = "8c1e39e2f8be7ab66c0fb2e9e57870ad";
  const API_URL = "https://gateway.apiserpro.serpro.gov.br/consulta-cpf-df/v1/cpf";
  
  export const consultarCPF = async (cpf: string): Promise<ReceitaFederalResponse | null> => {
    try {
      const cleanCPF = cpf.replace(/\D/g, '');
      
      const response = await fetch(`${API_URL}/${cleanCPF}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao consultar CPF: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao consultar CPF:', error);
      return null;
    }
  }