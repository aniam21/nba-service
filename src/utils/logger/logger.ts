
import { inspect } from 'util';
import type { SeverityLevel } from './severityLevel';

interface Option {
    dated?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export class logger {
  static options: Option;
  
  static init(options: Option): void {
    logger.options = options;
  }

  static log(severityLevel: SeverityLevel, message: string, additionalInfo?: any): void {
    const date = logger.options?.dated ? `[${new Date().toISOString()}]` : '';
    console.log(`${date}[${severityLevel}]: ${message}`);
    if (additionalInfo !== undefined) {
      console.log(inspect(additionalInfo, {
        showHidden: false, depth: null, colors: true, breakLength: 100,
      }));
    }
  }
}
