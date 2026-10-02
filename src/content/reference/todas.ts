// Todas las colecciones de la guía de referencia, cargadas de una vez (lo usan las pruebas).
// La aplicación usa ./index.ts, que las descarga bajo demanda.
import type { ColeccionRef } from './tipos'
import { pythonRef } from './python'
import { numpyRef } from './numpy'
import { pandasRef } from './pandas'
import { matplotlibRef } from './matplotlib'
import { estadisticaRef } from './estadistica'
import { sklearnRef } from './sklearn'
import { sqlRef } from './sql'
import { terminalRef } from './terminal'

export const colecciones: ColeccionRef[] = [pythonRef, numpyRef, pandasRef, matplotlibRef, estadisticaRef, sklearnRef, sqlRef, terminalRef]
