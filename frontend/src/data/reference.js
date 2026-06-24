export const clans = [
  'Banu Haqim', 'Brujah', 'Gangrel', 'Hecata', 'Lasombra', 'Malkaviano', 'Ministério', 'Nosferatu',
  'Ravnos', 'Salubri', 'Toreador', 'Tremere', 'Tzimisce', 'Ventrue', 'Caitiff', 'Sangue-Fraco'
];

export const predators = [
  'Gato dos Becos', 'Ensacador', 'Sanguessuga', 'Apegado', 'Consensualista', 'Fazendeiro',
  'Osíris', 'João Pestana', 'Rainha da Cena', 'Sereia'
];

export const disciplines = [
  'Animalismo', 'Auspícios', 'Celeridade', 'Dominação', 'Fortitude', 'Feitiçaria de Sangue',
  'Metamorfose', 'Oblívio', 'Ofuscação', 'Potência', 'Presença'
];

export const attributes = ['força','destreza','vigor','carisma','manipulação','autocontrole','inteligência','raciocínio','determinação'];
export const skills = ['atletismo','briga','condução','armas de fogo','furtividade','lábia','intimidação','persuasão','manha','performance','acadêmicos','ciência','investigação','medicina','ocultismo','política','tecnologia'];

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const clanSummaries = {
  'Banu Haqim': 'Juízes, assassinos e caçadores de transgressores, guiados por códigos rígidos de justiça e dívida.',
  Brujah: 'Rebeldes passionais, idealistas e violentos, marcados por fúria, movimento e conflito social.',
  Gangrel: 'Sobreviventes ferais e andarilhos, próximos da Besta, da natureza e da liberdade longe das cortes.',
  Hecata: 'Família de necromantes, médiuns e manipuladores da morte, ligados a fantasmas, sangue e segredos antigos.',
  Lasombra: 'Predadores aristocráticos e ambiciosos, mestres da sombra, do controle e da sobrevivência pela força.',
  Malkaviano: 'Videntes fragmentados e perturbadores, capazes de perceber verdades que outros preferem ignorar.',
  Ministério: 'Tentadores, libertadores e corruptores, especializados em desejo, fé, vício e quebra de correntes morais.',
  Nosferatu: 'Informantes deformados e espiões invisíveis, acostumados a sobreviver nas margens e nas profundezas.',
  Ravnos: 'Ilusionistas, andarilhos e trapaceiros, associados a engano, movimento e sobrevivência fora das estruturas fixas.',
  Salubri: 'Raros curandeiros, mártires ou monstros perseguidos, lembrados por seu terceiro olho e sua aura inquietante.',
  Toreador: 'Artistas, musas e críticos sociais, obcecados por beleza, desejo, memória e decadência.',
  Tremere: 'Feiticeiros do sangue, estudiosos hierárquicos e ambiciosos, ligados a rituais, segredos e controle oculto.',
  Tzimisce: 'Senhores possessivos, metamorfos e guardiões monstruosos de domínio, carne, território e identidade.',
  Ventrue: 'Líderes, reis e executivos da noite, definidos por comando, prestígio, tradição e responsabilidade cruel.',
  Caitiff: 'Vampiros sem clã reconhecido, livres de linhagem clara, mas desprezados e vistos como anomalias sociais.',
  'Sangue-Fraco': 'Vampiros de sangue diluído, frágeis e instáveis, mas capazes de adaptações incomuns e alquimia própria.'
};

const disciplineSummaries = {
  Animalismo: 'Permite comandar, compreender e projetar a Besta através de animais e instintos predatórios.',
  Auspícios: 'Amplia sentidos, percepção e intuição sobrenatural, revelando presenças, emoções e segredos ocultos.',
  Celeridade: 'Concede velocidade, reflexos e movimentos impossíveis, tornando o vampiro quase inalcançável.',
  Dominação: 'Subjuga a mente alheia por ordens, memórias alteradas e controle direto da vontade.',
  Fortitude: 'Reforça corpo e espírito, permitindo resistir a dano, coerção e horrores sobrenaturais.',
  'Feitiçaria de Sangue': 'Manipula o vitae por rituais e poderes místicos, exigindo estudo, símbolos e sacrifício.',
  Metamorfose: 'Expressa a natureza monstruosa do corpo vampírico por garras, sentidos, formas e adaptações.',
  Oblívio: 'Canaliza sombras, morte e vazio, tocando forças ligadas ao esquecimento e ao submundo.',
  Ofuscação: 'Oculta presença, aparência e ações, permitindo desaparecer da percepção comum.',
  Potência: 'Transforma força física em brutalidade sobrenatural, impacto devastador e domínio corporal.',
  Presença: 'Manipula emoções, fascínio e medo, fazendo o vampiro parecer irresistível, majestoso ou aterrador.'
};

function makeEntries(names, summaries, type) {
  return names.map((name) => ({
    name,
    slug: slugify(name),
    summary: summaries[name] || `Resumo de referência para ${name}.`,
    sections: [
      {
        title: 'Visão geral',
        text: summaries[name] || `Adicione aqui a visão geral completa de ${name}.`
      },
      {
        title: type === 'clan' ? 'Características e papel na crônica' : 'Uso na ficha e exemplos',
        text: `Espaço reservado para o texto completo de ${name}. Aqui você pode adicionar regras, observações, exemplos, poderes, restrições, relações com outros elementos e qualquer conteúdo que quiser manter como consulta.`
      },
      {
        title: 'Anotações',
        text: 'Substitua este bloco quando quiser inserir o conteúdo definitivo. A estrutura da página já está pronta.'
      }
    ]
  }));
}

export const clanDetails = makeEntries(clans, clanSummaries, 'clan');
export const disciplineDetails = makeEntries(disciplines, disciplineSummaries, 'discipline');
