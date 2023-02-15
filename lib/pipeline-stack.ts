import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';

export class WorkshopPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Create a CodeCommit repository
    new codecommit.Repository(this, 'WorkshopRepo', {
      repositoryName: "WorkshopRepo"
    });
    
    // Pipeline code goes here
  }
}
