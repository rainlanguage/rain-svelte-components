import { describe, it, expect } from 'vitest';
import {
    cleanup,
    render,
    screen,
} from '@testing-library/svelte';
import Parser from '../Parser.svelte';
import { get, writable, type Writable } from 'svelte/store';
import type { Deployer } from '../types';
import { rainlang, rlc } from '@rainprotocol/rainlang';
import type { ExpressionConfig, RDProblem } from '@rainprotocol/rainlang';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { Signer } from 'ethers';

describe("Parser Tests", () => {
    let user: UserEvent;
    let selectedDeployer: Writable<Deployer>;
    let expressionConfig: Writable<ExpressionConfig>;
    let addressContext = new Map([]);
    let signer: Signer;
    let errors: RDProblem[];

    const deployers = [
        {
            id: '4981eae3-7f4f-56ad-91de-d44e26775d7e',
            address: '0x023be8a728af2e5fccb62ab8159771718043ee1d',
            chainId: 80001,
            created_at: '2023-03-17T02:45:03.625651+00:00',
            opmeta:
                '0x789ced5d5b93dbb6157ecfafc0ec78a6762ada2b6d1c6f3dd387c44edb4c133b633bed741c3f4024246196226482d4aed2c97fef3907e09da0485dd6bb5b3d24e68a20017ce73b170007e0c7af18fb2ffcc7d859c497e2ec253b0b84af02e14d9e7f7b36327702a17dbcf39aee30ce74287dc1d48c4d65a2994a13bce60c1ec15fd89a87a9608f79b44916329a3315b16421984eb87ff5e469f656b512318f0278f147fa216b48a531f04c9cd8272a6df91eea9151206e58a2189562b1e00156378bd5f269f9196c2556733962e3e79fecef7f8cdcb586229a278bb66adfa4cba988f3ae43dd582b55695ad15af1f988bdc8eba57f3f591064b44aa94cd68ab3158fa1158988750999722bcbe8a834f6c5597eeb0f7b65eafa23033a4d6c2563fb0b0f25d7822a38235992b4f1297aa6460811b908f103dd615a2d054be234f2792202830c21d2931220480092b3485c571f3871e5885c1975978706ce45b21fb77cb5da783d0876b30a916117933ac17e4159f188a5c0106486a111d1e5926981ac48041bb3e906fed1f277614ae816e29c1f04457a7d7f502e5b40b1bdc5cee65d7742e32fb88c42195d79ab1860ace3f3815f09cdfe2640eba097ec7dc243f1dd0cba6271c8c9e65f510190a826c57b95bd97bd8db91f0a7ac79f34a35aa8a87908cbc642a761c2a6d0830015b7a8e55828cfa03125dd28759807013447a35261d34c73a9786f626b6cbec74bedafd511a4c02a091dc54a249ab6054f6c55d7320cd994682683fd94c308d429781525e226a90bfcc7488b1864083a614b305f40934825728b0afa905b385f85e9322291c6eada102293d710eb6adeb397a984fa77b478e74d44bb71f34c73bd05d78b3a86ef1122a306789b629788892891b12850a5e79fb25fb598a5219ba998e988aff4422509c28a78861c35cd5f08ff8a7e62a1d4140aa520245058b59601a88cd324ed84f67905ed43c15588a649b5be4cc31f2ddbca2cab528f9eda138aac855559dda63345b8fa2bbf03fb990a03cfa1e7bf881828b744f443053005cce700be5a03e128dc32ed37961affceb0809669a657c2973389b1d8866135869e9929d03608b27f9bd008df742d8364017f17a28be7e9123443e34326d2417ecb4440d3a01cd636489816f616518d277dcd08b5b28d0f511e70999e51cc85f0116e2ed335ee53a795959b89842454875e9234c1d4dbcaca6fcaaceca8d4846c1ec9a7ad562338eb0a4d618a3253972e5cf4d5859a50b2b70dd2117a6bd5c3ea15da0ab8098305d15b7f5cadaa142f7b561496dbb1821eb5875146af88da64aa0a2347162c8d501b2dccd7123441a753af2840fa58c44b1aa8800154c9580e1bcd1c54f8bd896e60f73096ee56b14c3e7bf0db6d0c76e12a3d73c7985a20d1ca53183163a089038159e4646c20a6e9bc4ed9efbeff919981b9219d0d5f0a3a866a0e263ac908b8e07180612cf809ad4231888a4b1ca1b490811a3647df522f5192c9f9e058e5bc052ae80da294b73ebff4f08e1339e55d2f64d81836bd33ba4cf73243cd0a6a1b1b90805188b2790c836b0a208726200a244a0e10d60c68761f347b8bb6957ea7c1cd3b1ecdf1b98f36e22c17f0d512de4583241a94c573e6b1f159b7a0b7286ced9d3465f26778e991357acb60319774fb5031bf8de22ae8d43f366c07c569310c9bddf328804e54277b8f417a8b0e3aaac0de798d2a7e4215ca7d6344a3668db127e8109a87ba67ad38cd241b3b54fc260d33867b4d6adf76e785c5f68c424ffef9c1fb675265f4cd2a76ea1c36c35b8aa58a37ed51258f88f986f8e8b4124ee3a938e61ba6e2b242180d41b59034f666346fbd7304d98f9ad4383b37ddaa117d1522d9ac5a2989bf67956125a33a1438b552ea5c9d34c30388b6d936ea9e4b886db344ffc0a9a1c7106248b0f01b76257c9f5f4d9e7ffbc44e4297c283c29cd5274d0f3436a6690cb78306114d9e83871eae902fbeb042baa64644ec7be3f1f3e7de94873c0233ab6675f9fc5d2404b42d6167f17e78f70a9f0342a374cc6fdcf715446e0315eb3033d9d40ecfce5af79fa3b64d1eb05a43f5ec3b255d87dd1d6934e5039789dfd0a29a9474ab987072959eb6f74de78d253425647050bbb8a79eb923e1c736147ec29eb1497b3cdc1dfbd5bc515fe5ad3783a2e7afd9e4c9ee21f49ecc3d40ec9d737a6743e3e03630ad17c327e7bbd89fc9f9c3b33e3bda9202c06d38272ae1a1a7d3d52a6cc45119d2e66e0bd07709dadd91b29ddf0254b60855b6bcbcb17c9043664b0f652962f0e5b13cb493ccb13b849f6c91456fd995d9de477af782f95f0afc1e7af3fc627ce1a9eba8c858a8ac05136674bb80181f61e856a1e688a64d9398fbc9d1124bb20a7630291d1d7f3119efe2c2e0b1930fb3542b41d8c9312c471cea00bac6b10700f3e1c61d397e1d79883a8d9b73f9e2738a2b1f3479f2583fc9a7dc12bbfc36a5dc443162f2a978cae6103d62d646b200c07f17b11ac1507d4d50cf58a44e23f62de26b5b9c898d089c829b86cabff2ccd4a42bcb849247d23816c07f2a9fadc70ca67fbff9205b9747756d69394d67277cb96a6f7c4bdbf3277a37bfd9da4687cacd8f305f87e5bdc0faea7f9b16bb7a069ade250a9bf307baa4d325fef326cb282ccd7b156af62546e3937bab43ad69d8e9d2bd8c29d7fd64050565204ee23abeb80cd25d19cdfd24060555846bf76609f124b6e38a6d65cc26fcd311672cf94d97f0e0b65c9e8ce26d88cb428d22834b0cac9d32938d45e98acc647492d92dc9cc404d329351a7cc54670802b74ff2ba9de5b665da4889ac48029c955c85d2e7273f757b42d1e9b44b28709b268c4e12b92db3966aa729d33eee291a5f362727e80ee36c266f44c0560a2451ca347cc302e1cb250f29557d7c59fc79bd10b180fb92f2ec69f2c8486bd83e92ec7d6d8919afb3baec8c89c96b980accc78a4dc383d62d8ae34a527853f228c21785e047eee6c52a8d7073426bf3642c0cbd313b050b667b4cf13711c72a269822864dc54607ea3a7acaced95fd96bb88246c2d5af2bd72ecbf32d298fbd997bc4fd83ad2345140c506d1b17bd61c3c62c0b6f62d3902ad368534c8011abac0c10b5cce79cb47b98992ea20635a2ce64aced0ee11decd2f930bb3458bae3aa09cab3c16a0d2f38b0658a958a4fdc2fd502b3501b6fdd9d598638ec6cb6a2abed3cdbc04fd23f8aed6bf366c32ce0ff9d89c9e600738d1ac6b4035128e384a191fd6b2b95b604a285c9b221e9e664b5f627cc03b15ac41da21b5e75536dda483279df62abd215e6a6a2ca2395768abfa8ba7676807020a8b4db77d2d533aac79a4ccd26daac3e0bdc7ee9e4cbd12214a7dc6cf2abb22d0520fb0baf53248df99bdc7f44a8b96fdffeacdb1c49de9237c304638eb7f0ba1418e5628a553c95a92e51c75ff63b9ed8e0e2cdfe82e351438dcad6dad88d48451eaeb3da26e04a771816e30d4a33a22df41a57601372fde2466a4c0c8fc48889500bbb1aae69c1b666af8789fd349a259bd9b1a141f0b9883dd9c86130bb192edc1b644988568656f6b4b700a2b89c03b4e1a03c8961bc802957116b4df0f8fb456c4a1e3105a76bafd7073ade20dbef056d1548609e0c708a2bae35ee184eea56dda9ad66f66666cf56c82a2f41fa0cb9d0bf05332ec303b5806a9f8151dcd37f4bf70cb1f89cf2d0cb4d6ddec257e019796c5d67c88169adf15fa2c07683412925d468d29d67e3d2fe32dbb90de36879d2cf3cac718ffaf8ecfc58b4b3e1d7d0c86a2fccc56737e66bd1dccad434ebbdac391d5941e82e09dd8cb427ab5eba7538ab8e38b9c46af39e3ccc7b6a37ed568fda0f8e32871b9454a734b7dc18dea075a8e45925b5809f5e69d5cae65d1df7c4ae5b56af79e29483d4a4010d8b568e800a1449335cd6ab22024c14d45fc070ed69fbb5673c080cdc30f9ce855a28c071de1675b1b243f0b623a5eb0e31b9b2e1d52d81553cf5d2e0dbf31b1869f375e3388a5fde7dff334f16ecd7d754e4257bc5433fc503b28cd3e0b14c16d051e9330e0e06624c740ce6d4a1cd88659374667eed5884bde98fdd90616d0b908816a144f31178d507575fc8c6f45703d8ff481106367a862129903561d70b05833a5b241b19572cb08a19055318d2dddc0ac03ba2663020d8e8b20f6e2d0b1d0dd85e53c216e076ad6a4069cc004ed238328764e121a4d5024fd93ba4270efeaf791c18abfc4048da35c15f86b825a16d9bca471c4005c665296ea4f077997ad447621e5ef544a57964e91658a632e2f1a68a0a4b7536496d6fcfb2a57de8ff42b54d3ade25d826056e935ec0cd42a51aa9e05da6ce183397a92b3cf6bdb173160182cd5cf7c20d6831043671e3233453b1c11886621dacebceaba2e9a701072ffb60335f0e55c5b950d0a7186292a5e0512520a1bd228f1ee9cf71f2f8867dcd364f1e3d7a9861ca7c69819ebb13d0cb30cb68bbb32de13c66cfd84d0939e3436fcf85ee880af59260c1ab3eb8848db1495f0719aab9098fefbc5a86910525749f5657c144cdc7e74361f1d572098eef1ea1627a6980a1eb9ed8ec1a3bdc2b68260532fd6283961c80062e3fdb8cd4f6803e9ff8dd1ad93f0c13deb5de5d4676d53ce4b981ec3b2ee1d5ec263b3792b64a20cf360f042c04a12758697fb41e43fc50e5d6932a821bf6388db49c47782833d71073c82811732c5704ff33be54a9663c9c2ba3dfbf9de51b844c4ed274c334c4b7313cf1dbd9c39148da4b24188d0d3599849680f84399a1d69708e276c4c574978c275d3a535a288ec06314bd8e5d9d761f2761921f0fee5ccc9533b6a27dd1780e93d9209dcf4edb2cacb9c2d3eda66a4d5ba2f20fb7944e263c2dde0c903848d188af22506d76d2e0cdae1da2a5273a52e8b27d1c20f82293ee44883b4c88ce4cb6324b9c5b456adb440e2ced69a8ae59793deb24e0610246c939970a551c8878aad495b71e7b6b0ea8e72791d4a4fda1718a4bfe2ca3078fe5e68a2666478754c02ab7aff6e99e1fdf668ffe6bd23fdc3027ac0cadeb6d76ee8a595c453c7ad7583d18a56f8d1ff0a9214b7528dc7d8f51a951a42c9dea2df7e2346662ae275e2c965ce2b0c9b307bc446b8841dbceb82583600bb3f8c33fdfe0fae9cc1c3b4f67af68fc18c391d867da7b9043d8e84dee6ef7400cecedba5531edadecc8ae0a93ee0124a65f5b01a07f31b32cd5edbe28733150c07c2ef23d66a266e75eb57c57c81e1e8e475966da557555f705438bca56088920ad0c02bdba6fc4319de9d1673c0acfb20cfef5855c8bc6200641a0920c47c866d5aca25618a598478939c810def6958bbb8a552b084ef0201e93b30d4605f6c8304b318f67470155e17b87df9db4b93075352c8e1dcb95cbbc9eadc72eedbcbd9c17db55ece98e27c0f51553c5911a7cb7e8ed5c3466230cd0ec4a6c9e9984a11597717edeb981528343c1fc17e0a9f9445c36fb738539a89543c4cb49fd07273154d71ece646db1a14cb53307d8eed184eddf318c449ab8b51eb17e4d65898f75488f89d480506e50565cdbe15ed445b7f6271242600a3956aa392156dd2f87256a6a4ebe17df51e087b8aa158e1179186eb26fc9e1d647e92f2873f7ee9c2af069c43e5ee0ffc6e7dbbf49e338837bc763b5ed37698a5d6dc34c19c9edf8a7dc56bf28686fd636316001cc92301993c71ae052872d4b7bb299dc973753b187bf7771bb98c5202e87622dc2874878e2fa3744f8f176c25f1c83f0177b101e247b0b5f3f40aedc6f05a911bfc7a45f20678d4d5a1505c98b322c2a6261678726564d7a9d1563c2469c02744f054e857b1af0fe26f1e3f41c61ec948508859f7861d288b71d276952f92cda2b72d6f284b5c2a4b93e31b354f07471844226470825f13bb173ccae0671e1d7f8f6b155f4a6b61db1a6070c7a6c6a7bc968b71066ddf168c31acfe507c65c8cd8b8f860d4c85db5eb5383a59ab1c84b3cd16d44cb0cf80925ccdf6fabf772c4fed2615a714f7daf636aeecf39bfb10045274d6f9c5a5b439486d4f931b5184dd3fe4ddaf48cbe32e3169f73fc20407fddab84a52d955a1f8d7c27a1fe0432458e1fc4c83a54355d053cb190e446d68b494ebd74975e907fa80e9f335f87c76c138a2fb25ed5559654b3a1ce070929441494a3a44a2f28f9d366dc49b34dde60d046e26fb61e3d71d94b4de8abd29d4da212fd1ab5fda3949747d9485fa68a5b7b92baf698c7acea103f1275189d492a3a63ebc1c0aca86b3f4797f718f119b1f2df5645c8037ef5e9abff01b5349ddf'
        },
        {
            id: '1b7593ab-9e7e-5a70-90cd-fdcc06390e2f',
            address: '0xac9bba4cde1c29a42ccac3e26e82f794243f1071',
            chainId: 80001,
            created_at: '2023-04-08T04:49:21.184584+00:00',
            opmeta:
                '0x789ced5d5b93dbb6157ecfafc0ec78a6762ada2b6d1c6f3dd387c44edb4c133b633bed741c3f4024246196226482d4aed2c97fef3907e09da0485dd6bb5b3d24e68a20017ce73b170007e0c7af18fb2ffcc7d859c497e2ec253b0b84af02e14d9e7f7b36327702a17dbcf39aee30ce74287dc1d48c4d65a2994a13bce60c1ec15fd89a87a9608f79b44916329a3315b16421984eb87ff5e469f656b512318f0278f147fa216b48a531f04c9cd8272a6df91eea9151206e58a2189562b1e00156378bd5f269f9196c2556733962e3e79fecef7f8cdcb586229a278bb66adfa4cba988f3ae43dd582b55695ad15af1f988bdc8eba57f3f591064b44aa94cd68ab3158fa1158988750999722bcbe8a834f6c5597eeb0f7b65eafa23033a4d6c2563fb0b0f25d7822a38235992b4f1297aa6460811b908f103dd615a2d054be234f2792202830c21d2931220480092b3485c571f3871e5885c1975978706ce45b21fb77cb5da783d0876b30a916117933ac17e4159f188a5c0106486a111d1e5926981ac48041bb3e906fed1f277614ae816e29c1f04457a7d7f502e5b40b1bdc5cee65d7742e32fb88c42195d79ab1860ace3f3815f09cdfe2640eba097ec7dc243f1dd0cba6271c8c9e65f510190a826c57b95bd97bd8db91f0a7ac79f34a35aa8a87908cbc642a761c2a6d0830015b7a8e55828cfa03125dd28759807013447a35261d34c73a9786f626b6cbec74bedafd511a4c02a091dc54a249ab6054f6c55d7320cd994682683fd94c308d429781525e226a90bfcc7488b1864083a614b305f40934825728b0afa905b385f85e9322291c6eada102293d710eb6adeb397a984fa77b478e74d44bb71f34c73bd05d78b3a86ef1122a306789b629788892891b12850a5e79fb25fb598a5219ba998e988aff4422509c28a78861c35cd5f08ff8a7e62a1d4140aa520245058b59601a88cd324ed84f67905ed43c15588a649b5be4cc31f2ddbca2cab528f9eda138aac855559dda63345b8fa2bbf03fb990a03cfa1e7bf881828b744f443053005cce700be5a03e128dc32ed37961affceb0809669a657c2973389b1d8866135869e9929d03608b27f9bd008df742d8364017f17a28be7e9123443e34326d2417ecb4440d3a01cd636489816f616518d277dcd08b5b28d0f511e70999e51cc85f0116e2ed335ee53a795959b89842454875e9234c1d4dbcaca6fcaaceca8d4846c1ec9a7ad562338eb0a4d618a3253972e5cf4d5859a50b2b70dd2117a6bd5c3ea15da0ab8098305d15b7f5cadaa142f7b561496dbb1821eb5875146af88da64aa0a2347162c8d501b2dccd7123441a753af2840fa58c44b1aa8800154c9580e1bcd1c54f8bd896e60f73096ee56b14c3e7bf0db6d0c76e12a3d73c7985a20d1ca53183163a089038159e4646c20a6e9bc4ed9efbeff919981b9219d0d5f0a3a866a0e263ac908b8e07180612cf809ad4231888a4b1ca1b490811a3647df522f5192c9f9e058e5bc052ae80da294b73ebff4f08e1339e55d2f64d81836bd33ba4cf73243cd0a6a1b1b90805188b2790c836b0a208726200a244a0e10d60c68761f347b8bb6957ea7c1cd3b1ecdf1b98f36e22c17f0d512de4583241a94c573e6b1f159b7a0b7286ced9d3465f26778e991357acb60319774fb5031bf8de22ae8d43f366c07c569310c9bddf328804e54277b8f417a8b0e3aaac0de798d2a7e4215ca7d6344a3668db127e8109a87ba67ad38cd241b3b54fc260d33867b4d6adf76e785c5f68c424ffef9c1fb675265f4cd2a76ea1c36c35b8aa58a37ed51258f88f986f8e8b4124ee3a938e61ba6e2b242180d41b59034f666346fbd7304d98f9ad4383b37ddaa117d1522d9ac5a2989bf67956125a33a1438b552ea5c9d34c30388b6d936ea9e4b886db344ffc0a9a1c7106248b0f01b76257c9f5f4d9e7ffbc44e4297c283c29cd5274d0f3436a6690cb78306114d9e83871eae902fbeb042baa64644ec7be3f1f3e7de94873c0233ab6675f9fc5d2404b42d6167f17e78f70a9f0342a374cc6fdcf715446e0315eb3033d9d40ecfce5af79fa3b64d1eb05a43f5ec3b255d87dd1d6934e5039789dfd0a29a9474ab987072959eb6f74de78d253425647050bbb8a79eb923e1c736147ec29eb1497b3cdc1dfbd5bc515fe5ad3783a2e7afd9e4c9ee21f49ecc3d40ec9d737a6743e3e03630ad17c327e7bbd89fc9f9c3b33e3bda9202c06d38272ae1a1a7d3d52a6cc45119d2e66e0bd07709dadd91b29ddf0254b60855b6bcbcb17c9043664b0f652962f0e5b13cb493ccb13b849f6c91456fd995d9de477af782f95f0afc1e7af3fc627ce1a9eba8c858a8ac05136674bb80181f61e856a1e688a64d9398fbc9d1124bb20a7630291d1d7f3119efe2c2e0b1930fb3542b41d8c9312c471cea00bac6b10700f3e1c61d397e1d79883a8d9b73f9e2738a2b1f3479f2583fc9a7dc12bbfc36a5dc443162f2a978cae6103d62d646b200c07f17b11ac1507d4d50cf58a44e23f62de26b5b9c898d089c829b86cabff2ccd4a42bcb849247d23816c07f2a9fadc70ca67fbff9205b9747756d69394d67277cb96a6f7c4bdbf3277a37bfd9da4687cacd8f305f87e5bdc0faea7f9b16bb7a069ade250a9bf307baa4d325fef326cb282ccd7b156af62546e3937bab43ad69d8e9d2bd8c29d7fd64050565204ee23abeb80cd25d19cdfd24060555846bf76609f124b6e38a6d65cc26fcd311672cf94d97f0e0b65c9e8ce26d88cb428d22834b0cac9d32938d45e98acc647492d92dc9cc404d329351a7cc54670802b74ff2ba9de5b665da4889ac48029c955c85d2e7273f757b42d1e9b44b28709b268c4e12b92db3966aa729d33eee291a5f362727e80ee36c266f44c0560a2451ca347cc302e1cb250f29557d7c59fc79bd10b180fb92f2ec69f2c8486bd83e92ec7d6d8919afb3baec8c89c96b980accc78a4dc383d62d8ae34a527853f228c21785e047eee6c52a8d7073426bf3642c0cbd313b050b667b4cf13711c72a269822864dc54607ea3a7acaced95fd96bb88246c2d5af2bd72ecbf32d298fbd997bc4fd83ad2345140c506d1b17bd61c3c62c0b6f62d3902ad368534c8011abac0c10b5cce79cb47b98992ea20635a2ce64aced0ee11decd2f930bb3458bae3aa09cab3c16a0d2f38b0658a958a4fdc2fd502b3501b6fdd9d598638ec6cb6a2abed3cdbc04fd23f8aed6bf366c32ce0ff9d89c9e600738d1ac6b4035128e384a191fd6b2b95b604a285c9b221e9e664b5f627cc03b15ac41da21b5e75536dda483279df62abd215e6a6a2ca2395768abfa8ba7676807020a8b4db77d2d533aac79a4ccd26daac3e0bdc7ee9e4cbd12214a7dc6cf2abb22d0520fb0baf53248df99bdc7f44a8b96fdffeacdb1c49de9237c304638eb7f0ba1418e5628a553c95a92e51c75ff63b9ed8e0e2cdfe82e351438dcad6dad88d48451eaeb3da26e04a771816e30d4a33a22df41a57601372fde2466a4c0c8fc48889500bbb1aae69c1b666af8789fd349a259bd9b1a141f0b9883dd9c86130bb192edc1b644988568656f6b4b700a2b89c03b4e1a03c8961bc802957116b4df0f8fb456c4a1e3105a76bafd7073ade20dbef056d1548609e0c708a2bae35ee184eea56dda9ad66f66666cf56c82a2f41fa0cb9d0bf05332ec303b5806a9f8151dcd37f4bf70cb1f89cf2d0cb4d6ddec257e019796c5d67c88169adf15fa2c07683412925d468d29d67e3d2fe32dbb90de36879d2cf3cac718ffaf8ecfc58b4b3e1d7d0c86a2fccc56737e66bd1dccad434ebbdac391d5941e82e09dd8cb427ab5eba7538ab8e38b9c46af39e3ccc7b6a37ed568fda0f8e32871b9454a734b7dc18dea075a8e45925b5809f5e69d5cae65d1df7c4ae5b56af79e29483d4a4010d8b568e800a1449335cd6ab22024c14d45fc070ed69fbb5673c080cdc30f9ce855a28c071de1675b1b243f0b623a5eb0e31b9b2e1d52d81553cf5d2e0dbf31b1869f375e3388a5fde7dff334f16ecd7d754e4257bc5433fc503b28cd3e0b14c16d051e9330e0e06624c740ce6d4a1cd88659374667eed5884bde98fdd90616d0b908816a144f31178d507575fc8c6f45703d8ff481106367a862129903561d70b05833a5b241b19572cb08a19055318d2dddc0ac03ba2663020d8e8b20f6e2d0b1d0dd85e53c216e076ad6a4069cc004ed238328764e121a4d5024fd93ba4270efeaf791c18abfc4048da35c15f86b825a16d9bca471c4005c665296ea4f077997ad447621e5ef544a57964e91658a632e2f1a68a0a4b7536496d6fcfb2a57de8ff42b54d3ade25d826056e935ec0cd42a51aa9e05da6ce183397a92b3cf6bdb173160182cd5cf7c20d6831043671e3233453b1c11886621dacebceaba2e9a701072ffb60335f0e55c5b950d0a7186292a5e0512520a1bd228f1ee9cf71f2f8867dcd364f1e3d7a9861ca7c69819ebb13d0cb30cb68bbb32de13c66cfd84d0939e3436fcf85ee880af59260c1ab3eb8848db1495f0719aab9098fefbc5a86910525749f5657c144cdc7e74361f1d572098eef1ea1627a6980a1eb9ed8ec1a3bdc2b68260532fd6283961c80062e3fdb8cd4f6803e9ff8dd1ad93f0c13deb5de5d4676d53ce4b981ec3b2ee1d5ec263b3792b64a20cf360f042c04a12758697fb41e43fc50e5d6932a821bf6388db49c47782833d71073c82811732c5704ff33be54a9663c9c2ba3dfbf9de51b844c4ed274c334c4b7313cf1dbd9c39148da4b24188d0d3599849680f84399a1d69708e276c4c574978c275d3a535a288ec06314bd8e5d9d761f2761921f0fee5ccc9533b6a27dd1780e93d9209dcf4edb2cacb9c2d3eda66a4d5ba2f20fb7944e263c2dde0c903848d188af22506d76d2e0cdae1da2a5273a52e8b27d1c20f82293ee44883b4c88ce4cb6324b9c5b456adb440e2ced69a8ae59793deb24e0610246c939970a551c8878aad495b71e7b6b0ea8e72791d4a4fda1718a4bfe2ca3078fe5e68a2666478754c02ab7aff6e99e1fdf668ffe6bd23fdc3027ac0cadeb6d76ee8a595c453c7ad7583d18a56f8d1ff0a9214b7528dc7d8f51a951a42c9dea2df7e2346662ae275e2c965ce2b0c9b307bc446b8841dbceb82583600bb3f8c33fdfe0fae9cc1c3b4f67af68fc18c391d867da7b9043d8e84dee6ef7400cecedba5531edadecc8ae0a93ee0124a65f5b01a07f31b32cd5edbe28733150c07c2ef23d66a266e75eb57c57c81e1e8e475966da557555f705438bca56088920ad0c02bdba6fc4319de9d1673c0acfb20cfef5855c8bc6200641a0920c47c866d5aca25618a598478939c810def6958bbb8a552b084ef0201e93b30d4605f6c8304b318f67470155e17b87df9db4b93075352c8e1dcb95cbbc9eadc72eedbcbd9c17db55ece98e27c0f51553c5911a7cb7e8ed5c3466230cd0ec4a6c9e9984a11597717edeb981528343c1fc17e0a9f9445c36fb738539a89543c4cb49fd07273154d71ece646db1a14cb53307d8eed184eddf318c449ab8b51eb17e4d65898f75488f89d480506e50565cdbe15ed445b7f6271242600a3956aa392156dd2f87256a6a4ebe17df51e087b8aa158e1179186eb26fc9e1d647e92f2873f7ee9c2af069c43e5ee0ffc6e7dbbf49e338837bc763b5ed37698a5d6dc34c19c9edf8a7dc56bf28686fd636316001cc92301993c71ae052872d4b7bb299dc973753b187bf7771bb98c5202e87622dc2874878e2fa3744f8f176c25f1c83f0177b101e247b0b5f3f40aedc6f05a911bfc7a45f20678d4d5a1505c98b322c2a6261678726564d7a9d1563c2469c02744f054e857b1af0fe26f1e3f41c61ec948508859f7861d288b71d276952f92cda2b72d6f284b5c2a4b93e31b354f07471844226470825f13bb173ccae0671e1d7f8f6b155f4a6b61db1a6070c7a6c6a7bc968b71066ddf168c31acfe507c65c8cd8b8f860d4c85db5eb5383a59ab1c84b3cd16d44cb0cf80925ccdf6fabf772c4fed2615a714f7daf636aeecf39bfb10045274d6f9c5a5b439486d4f931b5184dd3fe4ddaf48cbe32e3169f73fc20407fddab84a52d955a1f8d7c27a1fe0432458e1fc4c83a54355d053cb190e446d68b494ebd74975e907fa80e9f335f87c76c138a2fb25ed5559654b3a1ce070929441494a3a44a2f28f9d366dc49b34dde60d046e26fb61e3d71d94b4de8abd29d4da212fd1ab5fda3949747d9485fa68a5b7b92baf698c7acea103f1275189d492a3a63ebc1c0aca86b3f4797f718f119b1f2df5645c8037ef5e9abff01b5349ddf'
        }
    ];

    beforeAll(async () => {
        user = userEvent.setup();
        selectedDeployer = writable(deployers[0]);
        expressionConfig = writable({
            sources: [],
            constants: []
        });
        addressContext = new Map([['EVALUABLE_ADDRESSES', {
            getDeployers: async () => {
                return deployers;
            }
        }]]);
    });

    it("should render Parser component", async () => {
        render(Parser, {
            props: {
                deployers: deployers,
                raw: "",
                signer,
                errors,
            },
            context: addressContext
        });
        expect(screen.getByText("Expression"));
        expect(screen.getByText("Select interpreter"));
        expect(screen.getByText("Nothing to simulate."));
    });

    it("should hide components", async () => {
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                raw: "",
                hideHelp: true
            },
            context: addressContext
        });
        expect(screen.queryByText("Help")).toBeNull();
        expect(screen.queryByText("Load")).toBeTruthy();
        expect(screen.queryByText("Save")).toBeTruthy();
        expect(screen.queryByText("Detailed view")).toBeTruthy();
        cleanup();

        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                raw: "",
                hideExpand: true,
                hideHelp: true,
                hideLoad: true,
                hideSave: true
            },
            context: addressContext
        });
        expect(screen.queryByText("Help")).toBeNull();
        expect(screen.queryByText("Save")).toBeNull();
        expect(screen.queryByText("Detailed view")).toBeNull();
        expect(screen.queryByText("Load")).toBeNull();
    });

    it("should display deployer addresses when passed using props", async () => {
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                raw: ""
            },
            context: addressContext
        });
        deployers.forEach(deployer => {
            expect(screen.getByText(deployer.address));
        });
    });

    it("should dispatch the save event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig
            },
            context: addressContext
        });

        // Mock function
        let raw = '';
        const mock = vi.fn((event) => (raw = event.detail.raw));
        component.$on('save', mock);

        // Clicking save button
        const saveButton = screen.getByText("Save").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(raw).toBe(expression);
    });

    it("should dispatch the load event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;
        const componentName = "ParserComponentTest";
        const loadRaw = expression;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig,
                loadRaw,
                componentName
            },
            context: addressContext
        });

        // Mock function
        let loadData = '';
        const mock = vi.fn((event) => (loadData = event.detail));
        component.$on('load', mock);

        // Clicking save button
        const saveButton = screen.getByText("Load").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(loadData).toEqual({ loadRaw, componentName });
    });

    it("should dispatch the expand event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;
        const componentName = "ParserComponentTest";
        const loadRaw = expression;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig,
                loadRaw,
                componentName
            },
            context: addressContext
        });

        // Mock function
        let expandData = '';
        const mock = vi.fn((event) => (expandData = event.detail));
        component.$on('expand', mock);

        // Clicking save button
        const saveButton = screen.getByText("Detailed view").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(expandData).toEqual({ loadRaw, componentName, raw: expression });
    });

    it("should dispatch the help event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;
        const componentName = "ParserComponentTest";
        const loadRaw = expression;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig,
                loadRaw,
                componentName
            },
            context: addressContext
        });

        // Mock function
        let helpData = '';
        const mock = vi.fn((event) => (helpData = event.detail));
        component.$on('help', mock);

        // Clicking save button
        const saveButton = screen.getByText("Help").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(helpData).toBe(null);
    });

    it("should generate an expressionConfig for valid rainlang expressions", async () => {
        // 0
        const expression0 = rainlang`_: add(10 20);`
        // rendering component
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression0,
                expressionConfig
            },
            context: addressContext
        });

        // asserting deployers
        deployers.forEach(deployer => {
            expect(screen.getByText(deployer.address));
        });

        // asserting expressionConfig
        const expectedExpressionConfig0 = await rlc(expression0, get(selectedDeployer).opmeta);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig0);
        cleanup();

        // 1
        const expression1 = rainlang` _ _: erc-1155-balance-of-batch(
            0x01
            0x02
            0x03
            0x02
            0x03
        );`
        // rendering component
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression1,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        const expectedExpressionConfig1 = await rlc(expression1, get(selectedDeployer).opmeta);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig1);
        cleanup();

        // 2
        const expression2 = rainlang`  
            c0: 1,
            c1: 2,
            condition: 1, 
            _ _: do-while<1>(c0 c1 condition);
            
            s0 s1: ,
            o0 o1: 1 2,
            condition: 3; 

            s0: ,
            _: less-than(s0 3);

            s0 s1: ,
            _: add(s0 4),
            _: add(s1 5);`;

        // rendering component
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression2,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        const expectedExpressionConfig2 = await rlc(expression2, get(selectedDeployer).opmeta);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig2);
    });

    it("should throw an error for invalid rainlang expressions", async () => {
        // 0
        const expression0 = rainlang`_: add(10 20)`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression0,
                expressionConfig
            },
            context: addressContext
        });

        // asserting deployers
        deployers.forEach(deployer => {
            expect(screen.getByText(deployer.address));
        });

        // asserting expressionConfig
        expect(screen.getByText(/source item expressions must end with semi/)).toBeTruthy();
        cleanup();

        // 1
        const expression1 = rainlang`_: add(¢ 2);`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression1,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.getByText(/found non-printable-ASCII character with unicode: "U\+00a2"/)).toBeTruthy();
        cleanup();

        // 2
        const expression2 = rainlang`x: read-memory<error-argument>();`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression2,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.getByText(/invalid argument pattern/)).toBeTruthy();
        cleanup();

        // 3
        const expression3 = rainlang`_: add(do-while<1>(1 2 3 1 3 ) add(10 20));`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression3,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.getByText(/multi output opcodes cannot be nested/)).toBeTruthy();
        cleanup();

        // 4
        const expression4 = rainlang`_: read-mem.ory<1 1>();`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression4,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.getByText(/invalid word pattern: "read-mem.ory"/)).toBeTruthy();
        expect(screen.getByText(/unknown opcode: "read-mem.ory"/)).toBeTruthy();
    });
    it("should throw an error when a context is not passed", async () => {
        try {
            render(Parser, {
                props: {
                    deployers: deployers,
                    signer,
                    raw: ""
                }
            });
        }
        catch (error) {
            expect(error.message).toContain("Context 'EVALUABLE_ADDRESSES' is missing");
        }
    });

});
