// import type { OpMeta } from "rain-metadata/type-definitions/op";

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

export type Deployer = {
	address: string,
	opmeta: any[]
}

export type GetDeployers = () => Deployer[]