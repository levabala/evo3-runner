import { Simulation } from 'evo3-model';

const sim = new Simulation(10, 10, true);

setInterval(() => sim.tick(), 1000);
sim.tick();

sim.spawnRandomCreature();
sim.spawnRandomCreature();
sim.spawnRandomCreature();
sim.spawnRandomCreature();
sim.spawnRandomCreature();
