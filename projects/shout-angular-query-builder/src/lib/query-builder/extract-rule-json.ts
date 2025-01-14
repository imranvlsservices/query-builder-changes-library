import { RuleSet } from "./query-builder.interfaces";


    
    // Method to extract rules from the provided JSON
    export function extractRulesFromJson(json: any): RuleSet {
        console.log('In rule extractor ',json);
      const ruleSet: RuleSet = {
        condition: json.conditions?.condition,
        rules: [],
      };
     console.log('data is ',json);
      // Iterate through the rules in the JSON
      json.conditions.rules.forEach((rule: any) => {
        if (rule.field) {
          // Add individual rule
          ruleSet.rules.push({
            field: rule.field,
            operator: rule.operator,
            value: rule.value,
          });
        } else if (rule.condition) {
          // Add nested RuleSet
          ruleSet.rules.push(extractRulesFromJson({ conditions: rule }));
        }
      });
  
      return ruleSet;
    }
