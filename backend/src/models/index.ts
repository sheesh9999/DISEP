import Drug from './Drug';
import DrugInteraction from './DrugInteraction';
import SideEffect from './SideEffect';

// Set up Drug-SideEffect associations
Drug.hasMany(SideEffect, {
  foreignKey: 'drugId',
  as: 'sideEffects'
});
SideEffect.belongsTo(Drug, {
  foreignKey: 'drugId'
});

// Set up Drug-DrugInteraction associations
Drug.hasMany(DrugInteraction, {
  foreignKey: 'drug1Id',
  as: 'interactionsAsDrug1'
});
Drug.hasMany(DrugInteraction, {
  foreignKey: 'drug2Id',
  as: 'interactionsAsDrug2'
});
DrugInteraction.belongsTo(Drug, {
  foreignKey: 'drug1Id',
  as: 'drug1'
});
DrugInteraction.belongsTo(Drug, {
  foreignKey: 'drug2Id',
  as: 'drug2'
});

export {
  Drug,
  DrugInteraction,
  SideEffect
}; 