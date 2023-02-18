export type EvaluableConfig = {
	IExpressionDeployerV1: string;
	sources: any[];
	constants: any[];
};

export const constructEvaluableConfig: () => EvaluableConfig = () => {
	return {
		IExpressionDeployerV1: '',
		sources: [],
		constants: []
	};
};

export type EvaluableAddresses = string;
