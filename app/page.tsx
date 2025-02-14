"use client";
import React, { useState, useEffect } from 'react';
import { Download, Upload } from 'lucide-react';

// Removendo "overlay" problemáticos e mantendo todas as perguntas
type Question = { id: string; label: string };

const QuestionSection = ({ 
  title, 
  questions, 
  responses, 
  onChange 
}: { 
  title: string; 
  questions: Question[]; 
  responses: Record<string, string>; 
  onChange: (id: string, value: string) => void; 
}) => (  <section className="mb-12">    
    <h3 className="text-2xl font-title mb-8 text-amber-500 border-b border-amber-500/30 pb-4 flex items-center">
      <span className="text-amber-600 mr-2">❧</span>
      {title}
      <span className="text-amber-600 ml-2">❧</span>
    </h3>
    
    <div className="space-y-8">
      {questions.map(q => (
        <div key={q.id} className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-amber-900 transition-colors duration-300 shadow-lg">
          <label className="block mb-4 font-questions text-lg text-amber-100">
            {q.label}
          </label>
          
          <textarea 
            className="w-full p-4 bg-slate-800 text-amber-50 rounded-lg border border-slate-600 min-h-32 font-answers focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            onChange={(e) => onChange(q.id, e.target.value)}
            value={responses[q.id] || ''}
            placeholder="Sua resposta aqui..."
          />
        </div>
      ))}
    </div>
  </section>
);

const QuestionnairePage = () => {
  const [formType, setFormType] = useState('group');
  const [responses, setResponses] = useState({});
  const [characterName, setCharacterName] = useState('');

  // Todas as questões do formulário original
  const questions = {
    group: {
      formation: [
        {
          id: 'groupFormation',
          label: 'Como e onde o grupo se formou? Que circunstância improvável uniu pessoas tão diferentes?'
        },
        {
          id: 'firstMission',
          label: 'Qual foi a primeira missão que fez vocês perceberem que funcionavam bem juntos?'
        },
        {
          id: 'reputation',
          label: 'Que alcunha ou reputação o grupo ganhou em suas aventuras anteriores?'
        },
        {
          id: 'unwelcome',
          label: 'Existe algum local onde o grupo não é mais bem-vindo? Por quê?'
        }
      ],
      experiences: [
        {
          id: 'discovery',
          label: 'Qual foi a descoberta mais perturbadora que fizeram juntos?'
        },
        {
          id: 'costlyVictory',
          label: 'Que vitória custou mais caro ao grupo? O que foi perdido?'
        },
        {
          id: 'groupSecret',
          label: 'Que segredo vocês juraram manter entre si?'
        },
        {
          id: 'heroicMoment',
          label: 'Qual membro do grupo já salvou os outros de uma situação aparentemente impossível?'
        }
      ],
      dynamics: [
        {
          id: 'rewards',
          label: 'Como vocês dividem os espólios e recompensas?'
        },
        {
          id: 'ritual',
          label: 'Que ritual ou tradição o grupo desenvolveu em suas viagens?'
        },
        {
          id: 'discord',
          label: 'Qual é o maior ponto de discórdia entre os membros?'
        },
        {
          id: 'leadership',
          label: 'Que tipo de situação faz cada membro assumir naturalmente a liderança?'
        }
      ]
    },
    individual: {
      reputation: [
        {
          id: 'homecoming',
          label: 'De onde você é? Você é nativo de Drakkenheim ou veio de outros Planos?'
        },
        {
          id: 'custom',
          label: 'Qual ritual ou tradição de sua cultura/religião você ainda mantém, mesmo longe de casa?'
        },
        {
          id: 'knownFeat',
          label: 'Por qual feito ou missão você é mais conhecido?'
        },
        {
          id: 'uniqueSkill',
          label: 'Que habilidade única você desenvolveu em suas aventuras solitárias?'
        },
        {
          id: 'faction',
          label: 'Qual organização ou facção você ajudou no passado?'
        },
        {
          id: 'avoidedWork',
          label: 'Que tipo de trabalho você prefere evitar, mesmo que bem pago?'
        }
      ],
      experiences: [
        {
          id: 'discovery',
          label: 'Qual foi sua descoberta mais valiosa até hoje?'
        },
        {
          id: 'hardLesson',
          label: 'Que lição você aprendeu da maneira mais difícil?'
        },
        {
          id: 'lostone',
          label: 'Há alguém que você tenha deixado para trás que ainda espera seu retorno?'
        },
        {
          id: 'contact',
          label: 'Que contato ou aliado sempre tem informações úteis para você?'
        }
      ],
      shadowAndYou: [  // ⬅️ ADICIONAMOS ESTA NOVA SEÇÃO AQUI
        {
          id: "recurringNightmare",
          label: "Que pesadelo recorrente faz você acordar suando frio, mesmo que não consiga se lembrar completamente dele?"
        },
        {
          id: "questionSanity",
          label: "Qual foi o evento inexplicável que te fez questionar sua própria sanidade pela primeira vez?"
        },
        {
          id: "forbiddenKnowledge",
          label: "Que conhecimento você possui que preferiria esquecer?"
        },
        {
          id: "ominousProphecy",
          label: "Qual foi a profecia ou presságio que você ouviu sobre si mesmo e teme que possa ser verdade?"
        },
        {
          id: "ancientRitual",
          label: "Que ritual ou prática antiga você testemunhou e desejaria não ter visto?"
        },
        {
          id: "forgottenPromise",
          label: "Que promessa antiga ainda te persegue, mesmo que você não se lembre de tê-la feito?"
        },
        {
          id: "impossibleEncounter",
          label: "Que pessoa do seu passado você tem certeza que viu recentemente, mesmo sabendo que isso seria impossível?"
        },
        {
          id: "forbiddenDoors",
          label: "Por que você tem certeza que algumas portas deveriam permanecer fechadas?"
        },
        {
          id: "hiddenTruth",
          label: "Que verdade você descobriu que ninguém mais parece perceber?"
        },
        {
          id: "undeadGods",
          label: "Por que você sabe que alguns deuses... não estão realmente mortos?"
        }
      ]

    },
    common: [
      {
        id: 'questionablePower',
        label: 'Qual limite você estabeleceu para si mesmo que jurou nunca ultrapassar?'
      },
      {
        id: 'wrongInfo',
        label: 'Qual foi o preço mais alto que você já pagou pela informação errada?'
      },
      {
        id: 'avoidedSituation',
        label: 'Que tipo de situação você aprendeu a evitar após experiências ruins?'
      },
      {
        id: 'consequences',
        label: 'Como você lida com as consequências imprevistas de suas ações?'
      },
      {
        id: 'secreto',
        label: 'Qual o seu maior segredo? Com quem que não está mais aqui você o compartilhou?'
      },
      {
        id: 'drakkenheim',
        label: 'O que você ouviu sobre Drakkenheim que lhe causa medo, curiosidade ou simpatia?'
      },
      {
        id: 'hibergarde',
        label: 'Qual sua opinião sobre a pacata Hibergarde e o que lhe interessa aqui?'
      },
      {
        id: 'relevantKnowledge',
        label: 'Que conhecimento ou item em sua posse pode ser relevante para os mistérios locais?'
      }
    ]
  };

  useEffect(() => {
    const savedResponses = localStorage.getItem('questionnaire-responses');
    const savedType = localStorage.getItem('questionnaire-type');
    const savedName = localStorage.getItem('character-name');
    
    if (savedResponses) setResponses(JSON.parse(savedResponses));
    if (savedType) setFormType(savedType);
    if (savedName) setCharacterName(savedName);
  }, []);

  const handleInputChange = (questionId: string, value: string) => {
    const newResponses = {
      ...responses,
      [questionId]: value
    };
    setResponses(newResponses);
    localStorage.setItem('questionnaire-responses', JSON.stringify(newResponses));
  };

  const handleTypeChange = (type: string) => {
    setFormType(type);
    localStorage.setItem('questionnaire-type', type);
  };

  const handleNameChange = (name: string) => {
    setCharacterName(name);
    localStorage.setItem('character-name', name);
  };

  const exportResponses = () => {
    const data = {
      characterName,
      formType,
      responses
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterName || 'personagem'}-historia.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importResponses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Garante que existe um arquivo
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target || !e.target.result) return; // Evita erro de 'null'
  
      try {
        const data = JSON.parse(e.target.result as string);
        setResponses(data.responses);
        setFormType(data.formType);
        setCharacterName(data.characterName);
        localStorage.setItem('questionnaire-responses', JSON.stringify(data.responses));
        localStorage.setItem('questionnaire-type', data.formType);
        localStorage.setItem('character-name', data.characterName);
      } catch (error) {
        console.error('Erro ao importar arquivo:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-amber-50/90 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">          
          <h1 className="text-6xl font-title font-bold mb-6 text-amber-500 tracking-wider">
            Obituário de Deuses
          </h1>
          
          <div className="flex items-center justify-center mb-4">
            <span className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <h2 className="text-3xl font-title mx-4 text-amber-400/80">
              Histórias de Aventureiros
            </h2>
            <span className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>
          
          <p className="font-questions text-amber-200/60 italic">
          <p>&quot;Nas sombras do passado, forjam-se os heróis do amanhã&quot;</p>
          </p>
        </header>

        <div className="bg-slate-900 p-8 rounded-lg mb-12 border border-amber-900/30 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <input 
              type="text"
              placeholder="Nome do Personagem"
              className="w-full md:w-auto p-4 bg-slate-800 text-amber-50 rounded-lg border border-slate-700 font-answers placeholder-slate-500 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              value={characterName}
              onChange={(e) => handleNameChange(e.target.value)}
            />
            
            <div className="flex gap-4">
              <button 
                onClick={exportResponses}
                className="flex items-center gap-2 px-6 py-3 bg-amber-900 hover:bg-amber-800 text-amber-100 rounded-lg transition-colors duration-300 shadow-lg font-questions"
              >
                <Download size={18} />
                Exportar
              </button>
              
              <label className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-100 rounded-lg cursor-pointer transition-colors duration-300 shadow-lg font-questions">
                <Upload size={18} />
                Importar
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={importResponses}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <select 
            className="w-full p-4 bg-slate-800 border border-amber-900/30 rounded-lg text-amber-100 font-questions focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
            value={formType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="group">Grupo Estabelecido</option>
            <option value="individual">Aventureiro Solitário</option>
          </select>
        </div>

        {formType === 'group' && (
          <>
            <QuestionSection 
              title="Formação e Primeiras Aventuras"
              questions={questions.group.formation}
              responses={responses}
              onChange={handleInputChange}
            />
            <QuestionSection 
              title="Experiências Marcantes"
              questions={questions.group.experiences}
              responses={responses}
              onChange={handleInputChange}
            />
            <QuestionSection 
              title="Dinâmica do Grupo"
              questions={questions.group.dynamics}
              responses={responses}
              onChange={handleInputChange}
            />
          </>
        )}

{formType === 'individual' && (
  <>
    <QuestionSection 
      title="Reputação e Feitos"
      questions={questions.individual.reputation}
      responses={responses}
      onChange={handleInputChange}
    />
    <QuestionSection 
      title="Experiências Prévias"
      questions={questions.individual.experiences}
      responses={responses}
      onChange={handleInputChange}
    />
    {/* Agora o <p> está dentro do fragmento corretamente */}
    <p className="italic text-amber-300/80 mt-4">
      As perguntas a seguir podem parecer estranhas. Não existe resposta certa ou errada - apenas aquela que ressoa com a escuridão dentro do seu personagem.
    </p>
    <QuestionSection 
      title="A Sombra e Você"
      questions={questions.individual.shadowAndYou}
      responses={responses}
      onChange={handleInputChange}
    />
        {/* "Elementos Comuns" agora aparece apenas para Aventureiro Solitário */}
      <QuestionSection 
      title="Elementos Comuns"
      questions={questions.common}
      responses={responses}
      onChange={handleInputChange}
    />
  </>
)}
      </div>
      
      <style jsx global>{`
        .font-title {
          font-family: 'Jacquard 24', serif;
        }
        
        .font-questions {
          font-family: 'Luxurious Roman', serif;
        }
        
        .font-answers {
          font-family: 'Cormorant Infant', serif;
          font-size: 1.1rem;
        }
        
        textarea::placeholder {
          font-family: 'Cormorant Infant', serif;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default QuestionnairePage;